#target photoshop

// PROMPT FOR USER INPUT
var fileSuffix = prompt( "Input the file name of HTML", "" );
if( !fileSuffix ){
    fileSuffix = "export";
}



function getPngOptions() {
    var pngExportOptions = new ExportOptionsSaveForWeb();
    pngExportOptions.format = SaveDocumentType.PNG;
    pngExportOptions.optimized = true;
    pngExportOptions.PNG8 = false;
    return pngExportOptions;
}



function slicesExporter() {

    // the history before merge
    var historyBefore = app.activeDocument.historyStates.length;

    // all layers
    var layers = app.activeDocument.artLayers;

    // merge all layers
    if (layers.length > 1) {
        app.activeDocument.mergeVisibleLayers();
    }

    // GET ACTIVE DOCUMENT
    var currentDocument = app.activeDocument;
    // GET ACTIVE DOCUMENT FILENAME
    var currentFilename = currentDocument.fullName;
    // GET ACTIVE DOCUMENT FOLDER
    var folder = currentFilename.parent.selectDlg("Select a directory of HTML");
    // GET PNG EXPORT OPTIONS
    var options = getPngOptions();
    // SETS AN HISTORY STATE TO RECOVER AFTER THE SCRIPT RUNS
    var historySavedState = currentDocument.activeHistoryState;
    // RESET SLICES LAYER GROUP EXISTENCE

    var layer = layers[0];
    // slice
    activeDocument.crop( layer.bounds, 0, layer.bounds[2] - layer.bounds[0], layer.bounds[3] - layer.bounds[1] );

    // CREATES NEW PNG FILE
    var file = new File(folder.fsName+'/'+ fileSuffix + '.png');
    // EXPORTS FILE
    currentDocument.exportDocument( file, ExportType.SAVEFORWEB, options );
    // REWINDS HISTORY STATE TO A STATE BEFORE THE SCRIPT RUNS
    currentDocument.activeHistoryState = historySavedState;


    // back to history
    var history = currentDocument.historyStates;
    currentDocument.activeHistoryState = history[historyBefore - 1];


    alert("Export success!");
}

// slicesExporter();
slicesExporter();