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
            commands.addCommand({
                name: "restart_supervisor",
                exec: function(){
                    proc.spawn("supervisor", {
                        args: ["-c supervisor.conf"],
                        cwd: "/home/ubuntu"
                    }, function(err, stdout, stderr){
                        if (err) return console.error(err);
                    });
                    
                    proc.execFile("echo", {
                        args: ["VNC client running at https://$C9_HOSTNAME/vnc.html"]
                    }, function(err, stdout, stderr){
                        if (err) return console.error(err);
                        
                        console.log(stderr, stdout);
                    })
                }
            }, plugin);
            
            commands.addCommand({
                name: "open_desktop_in_new_tab",
                bindKey: { 
                    mac: "Command-Shift-Alt-D", 
                    win: "Ctrl-Shift-Alt-D" 
                },
                exec: function(){
                    
                    var vncpath = "https://" + c9.location + "/vnc.html";
                    tabManager.open({
                        path: vncpath,
                        editorType: "preview",
                        focus: true,
                        active: true,
                        pane: tabManager.getPanes()[1]
                    }, function(err, tab){
                        if (err) return console.error(err);
                        
                    });
                }
            })
            
            
            menus.addItemByPath("View/Desktop/Restart Desktop", new ui.item({
                command: "restart_supervisor"
            }), 300, plugin);
            
            menus.addItemByPath("View/Desktop/Open Desktop", new ui.item({
                command: "open_desktop_in_new_tab"
            }), 301, plugin);
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