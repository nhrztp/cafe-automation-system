// Printer helper functions
var PrinterHelper = {
    // Store printer preferences
    setPrinterPreference: function(printerType, printerName) {
        localStorage.setItem('printer_' + printerType, printerName);
    },
    
    // Get printer preference
    getPrinterPreference: function(printerType) {
        return localStorage.getItem('printer_' + printerType);
    },
    
    // Print to specific printer (Windows-specific)
    printToNamedPrinter: function(printerName) {
        // Store the target printer name
        this.setPrinterPreference('last_target', printerName);
        
        // Note: Direct printer selection via JavaScript is limited in browsers
        // The user may need to select the printer manually in the print dialog
        // However, we can guide them with the printer name
        
        // Try to trigger print with a hint about which printer to use
        console.log('Printing to: ' + printerName);
        
        // Show a brief message if the printer name is known
        if (printerName && printerName !== 'default') {
            var message = document.createElement('div');
            message.style.cssText = 'position:fixed;top:10px;right:10px;background:#007bff;color:white;padding:15px 20px;border-radius:5px;z-index:10000;font-family:Arial;';
            message.innerHTML = '<strong>Yazdırılacak yazıcı: ' + printerName + '</strong>';
            document.body.appendChild(message);
            
            setTimeout(function() {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 3000);
        }
        
        // Trigger the browser's print dialog
        window.print();
    },
    
    // Auto-print with delay
    autoPrint: function(printerName, delayMs) {
        var self = this;
        delayMs = delayMs || 500;
        
        setTimeout(function() {
            self.printToNamedPrinter(printerName);
        }, delayMs);
    }
};

// CSS for print that can help target specific printers
function addPrinterSpecificStyles(printerName) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'thermal-printer-styles';
    
    // Remove any existing thermal printer styles
    var existingStyle = document.getElementById('thermal-printer-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Add printer-specific page settings for 80mm thermal printers
    var css = '@media print { ' +
              '  @page { ' +
              '    size: 80mm auto; ' +
              '    margin: 0; ' +
              '  } ' +
              '  body { ' +
              '    margin: 0; ' +
              '    padding: 0; ' +
              '    width: 80mm; ' +
              '    font-family: "Courier New", monospace; ' +
              '  } ' +
              '  * { ' +
              '    box-sizing: border-box; ' +
              '  } ' +
              '}';
    
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    
    document.head.appendChild(style);
}

