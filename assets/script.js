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

    var ips = ipInput.split(',').map(function(ip) {
        return ip.trim();
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

    // Adicionando objeto ao grupo
    ips.forEach(function(ip) {
        template += 'set device-group INLINE address-group MDR-BLOCKING-1 static HOST-' + ip + '-' + ritmInput + '\n';
    });

    // Adicionando objeto ao grupo 
    ips.forEach(function(ip) {
        template += 'set device-group DG-VSYS_BORDER address-group GRP-BLOCK-PASSWD-SPRAY-1 static HOST-' + ip + '-' + ritmInput + '\n';
    });

    output.value = template.trim();
    console.log("Template Gerado:", template);
}