define(function(require, exports, module) {

    module.exports = function(session, options){
        
        session.install({
            "name": "Desktop",
            "description": "Installs X11",
            "optional": false
        },
        {
            "ubuntu": ["supervisor", "xvfb", "fluxbox", "x11vnc"]
        });
        
        session.install({
            "name": "noVNC",
            "description": "Installs noVNC",
            "cwd": "/home/ubuntu",
            "optionl": false
        },
        {
            "bash": 'sudo git clone git://github.com/kanaka/noVNC'
        });
        
        session.install({
            "name": "SetupFiles",
            "description": "create file supervisor.conf",
            "cwd": "/home/ubuntu",
            "option": false
        },
        {
            "bash": 'wget https://raw.githubusercontent.com/shadowcodex/c9.ide.desktop/master/supervisord.conf'
        })
        
        // session.install({
        //     "name": "supervisor",
        //     "description": "Start supervisor and noVNC",
        //     "cwd": "/home/ubuntu",
        //     "optional": false
        // },
        // {
        //     "bash": 'sudo supervisord -c supervisord.conf >> supervisorlog.txt'
        // });
        
        
        
        session.start();
        
    };
    
    module.exports.version = 1; 

});