document.getElementById('generateButton').addEventListener('click', generateTemplate);

function generateTemplate() {
    console.log("Botão clicado");
    var ipInput = document.getElementById('ip').value;
    var ritmInput = document.getElementById('ritm').value;
    var output = document.getElementById('output');

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

    // Criando objeto 1
    ips.forEach(function(ip) {
        template += 'set device-group INLINE address HOST-' + ip + '-' + ritmInput + ' ip-netmask ' + ip + '/32\n';
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
    console.log("Template Gerado:", template);
}