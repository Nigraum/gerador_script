document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
  
    function adjustHeight() {
      output.style.height = 'auto'; // Redefine a altura para calcular o novo tamanho
      output.style.height = `${output.scrollHeight}px`; // Define a nova altura com base no conteúdo
    }
  
    // Ajusta a altura ao carregar a página e ao adicionar texto
    output.addEventListener('input', adjustHeight);
    adjustHeight(); // Ajusta a altura inicial
  
    // Configura o botão de gerar template
    document.getElementById('generateButton').addEventListener('click', generateTemplate);
  
    function generateTemplate() {
        console.log("Botão clicado");
        var ipInput = document.getElementById('ip').value;
        var ritmInput = document.getElementById('ritm').value;
        var output = document.getElementById('output');
        var outputFormatted = document.getElementById('outputFormatted'); // Novo campo de output
    
        console.log("IP Input:", ipInput);
        console.log("RITM Input:", ritmInput);
    
        if (!ipInput || !ritmInput) {
            alert('Por favor, preencha ambos os campos.');
            return;
        }
    
        // Remove espaços em branco dos inputs
        ipInput = ipInput.trim();
        ritmInput = ritmInput.trim();
    
        // Verifica se o campo de RITM tem espaços
        if (ritmInput.includes(' ')) {
            alert('O campo RITM não deve conter espaços.');
            return;
        }
    
        // Verifica e remove espaços dos IPs
        var ips = ipInput.split(',').map(function(ip) {
            var trimmedIp = ip.trim();
            if (trimmedIp.includes(' ')) {
                alert('Os IPs não devem conter espaços.');
                throw new Error('Os IPs não devem conter espaços.');
            }
            return trimmedIp;
        });
    
        var template = '';
        var formattedOutput = ''; // Variável para armazenar o novo formato
    
        // Criando objeto 1
        ips.forEach(function(ip) {
            template += 'set device-group INLINE address HOST-' + ip + '-' + ritmInput + ' ip-netmask ' + ip + '/32\n';
            formattedOutput += ip + ',' + ritmInput + ',\n'; // Adiciona o IP e RITM formatados
        });
    
        // Criando objeto 2
        ips.forEach(function(ip) {
            template += 'set device-group DG-VSYS_BORDER address HOST-' + ip + '-' + ritmInput + ' ip-netmask ' + ip + '/32\n';
        });
    
        template += '\n\n';
    
        // Adicionando objeto ao grupo
        ips.forEach(function(ip) {
            template += 'set device-group INLINE address-group MDR-BLOCKING-3 static HOST-' + ip + '-' + ritmInput + '\n';
        });
    
        // Adicionando objeto ao grupo 
        ips.forEach(function(ip) {
            template += 'set device-group DG-VSYS_BORDER address-group GRP-BLOCK-PASSWD-SPRAY-3 static HOST-' + ip + '-' + ritmInput + '\n';
        });
    
        output.value = template.trim();
        outputFormatted.value = formattedOutput.trim(); // Preenche o novo campo de output
        console.log("Template Gerado:", template);
        adjustHeight(); // Ajusta a altura após a geração do template
    }
  });
  