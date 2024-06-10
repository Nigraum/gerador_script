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

    ips.forEach(function(ip) {
        template += 'set device-group INLINE address HOST-' + ip + '-' + ritmInput + ' ip-netmask ' + ip + '/32\n';
        template += 'set device-group DG-VSYS_BORDER address HOST-' + ip + '-' + ritmInput + ' ip-netmask ' + ip + '/32\n';
        template += 'set device-group INLINE address-group MDR-BLOCKING-1 static HOST-' + ip + '-' + ritmInput + '\n';
        template += 'set device-group DG-VSYS_BORDER address-group GRP-BLOCK-PASSWD-SPRAY-1 static HOST-' + ip + '-' + ritmInput + '\n\n';
    });

    output.value = template.trim();
    console.log("Template Gerado:", template);
}
