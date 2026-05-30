// RockWeb Compiler - IE8 Compatible Engine (ES3 Standard)
function compileRockWeb(scriptText) {
    var lines = scriptText.split('\n');
    var jsOutput = "";
    var lastElementId = "";
    var elementCount = 0;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/^\s+|\s+$/g, ''); // Trim whitespace
        if (line === "" || line.indexOf("//") === 0) continue;

        var parts = line.split(' ');
        var command = parts[0].toUpperCase();
        var argument = line.substring(command.length).replace(/^\s+|\s+$/g, '');

        if (command === "WINDOW") {
            jsOutput += "document.title = '" + argument + "';\n";
            jsOutput += "document.body.style.backgroundColor = '#1c1c1c';\n";
            jsOutput += "document.body.style.color = '#dcget';\n";
            jsOutput += "document.body.style.fontFamily = 'Courier New', monospace';\n";
        }
        else if (command === "TITLE") {
            jsOutput += "document.title = '" + argument + "';\n";
        }
        else if (command === "LABEL") {
            elementCount++;
            lastElementId = "rock_lbl_" + elementCount;
            jsOutput += "var " + lastElementId + " = document.createElement('div');\n";
            jsOutput += lastElementId + ".innerText = '" + argument + "';\n"; // IE8 supports innerText
            jsOutput += lastElementId + ".style.position = 'absolute';\n";
            jsOutput += "document.body.appendChild(" + lastElementId + ");\n";
        }
        else if (command === "BUTTON") {
            elementCount++;
            lastElementId = "rock_btn_" + elementCount;
            var btnParts = argument.split('|');
            var btnText = btnParts[0];
            var btnAction = btnParts[1] || "";

            jsOutput += "var " + lastElementId + " = document.createElement('button');\n";
            jsOutput += lastElementId + ".innerText = '" + btnText + "';\n";
            jsOutput += lastElementId + ".style.position = 'absolute';\n";
            
            // Old-school IE8 event attachment technique
            if (btnAction !== "") {
                jsOutput += "if (" + lastElementId + ".attachEvent) {\n";
                jsOutput += "  " + lastElementId + ".attachEvent('onclick', function() { alert('" + btnAction + "'); });\n";
                jsOutput += "} else {\n";
                jsOutput += "  " + lastElementId + ".onclick = function() { alert('" + btnAction + "'); };\n";
                jsOutput += "}\n";
            }
            jsOutput += "document.body.appendChild(" + lastElementId + ");\n";
        }
        else if (command === "POS" && lastElementId !== "") {
            var coords = argument.split(',');
            if (coords.length === 2) {
                var x = coords[0].replace(/^\s+|\s+$/g, '');
                var y = coords[1].replace(/^\s+|\s+$/g, '');
                jsOutput += lastElementId + ".style.left = '" + x + "px';\n";
                jsOutput += lastElementId + ".style.top = '" + y + "px';\n";
            }
        }
        else if (command === "BEEP") {
            // Creative workaround for IE8 audio using native system sounds via dummy elements
            jsOutput += "try { var b = document.createElement('bgsound'); b.src = 'C:\\\\Windows\\\\Media\\\\ding.wav'; document.body.appendChild(b); } catch(e) {}\n";
        }
    }

    return jsOutput;
}
