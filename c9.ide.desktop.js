define(function(require, exports, module) {
    main.consumes = ["Plugin", "menus", "commands", "proc", "tabManager", "ui", "c9"];
    main.provides = ["c9.ide.desktop"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var menus = imports.menus;
        var commands = imports.commands;
        var proc = imports.proc;
        var tabManager = imports.tabManager;
        var ui = imports.ui;
        var c9 = imports.c9;
        
        /***** Initialization *****/
        
        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        
        function load() {
            ////////////////////////////////////////////////////////////////////
            /////////////// Start Supervisor Command ///////////////////////////
            ////////////////////////////////////////////////////////////////////
            commands.addCommand({
                name: "restart_supervisor",
                exec: function(){
                    proc.spawn("supervisord", {
                        args: ["-c", "supervisord.conf"],
                        cwd: "/home/ubuntu"
                    }, function(err, process){
                        if (err) return console.error(err);
                        
                        process.stderr.on("data", function(chunk) {
                            console.log(chunk); 
                        });
                        
                        process.stdout.on("data", function(chunk) {
                            console.log(chunk); 
                        });
                        
                        process.on("exit", function(code) {
                            console.log("novnc stopped"); 
                        });
                        
                        process.unref();
                    })
                    
                    proc.execFile("echo", {
                        args: ["VNC client running at https://$C9_HOSTNAME/vnc.html"]
                    }, function(err, stdout, stderr){
                        if (err) return console.error(err);
                        
                        console.log(stderr, stdout);
                    })
                }
            }, plugin);
            
            ////////////////////////////////////////////////////////////////////
            /////////////// Open Desktop In New Tab  ///////////////////////////
            ////////////////////////////////////////////////////////////////////
            commands.addCommand({
                name: "open_desktop_in_new_tab",
                bindKey: { 
                    mac: "Command-Shift-Alt-D", 
                    win: "Ctrl-Shift-Alt-D" 
                },
                exec: function(){
                    var vncpath = "https://" + c9.hostname + "/vnc.html";
                    tabManager.open({
                        value: vncpath,
                        editorType: "urlview",
                        active: true,
                        title: "Desktop",
                        pane: tabManager.getPanes()[0],
                        document   : {
                            urlview : {
                                backgroundColor : "#FF0000",
                                dark            : true
                            }
                        }
                    }, function(err, tab){
                        if (err) return console.error(err);
                        tab.title = "Desktop";
                    })
                }
            }, plugin);
            
            ////////////////////////////////////////////////////////////////////
            /////////////// Add Commans To View Menu ///////////////////////////
            ////////////////////////////////////////////////////////////////////
            menus.addItemByPath("View/Start Desktop", new ui.item({
                command: "restart_supervisor"
            }), 101, plugin);
            
            
            menus.addItemByPath("View/Open Desktop", new ui.item({
                command: "open_desktop_in_new_tab"
            }), 102, plugin);
        }
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
        
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "c9.ide.desktop": plugin
        });
    }
});