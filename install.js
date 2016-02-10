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
            "bash": 'sudo echo -e "[supervisord]\nnodaemon=true\n\n[program:xvfb]\ncommand=/usr/bin/Xvfb :99 -screen 0 1280x864x16 -ac -pn -noreset\n\n[program:x11vnc]\ncommand=x11vnc -shared -rfbport 5900 -display :99\n\n[program:novnc]\ncommand=/bin/bash -c "/home/ubuntu/noVNC/utils/launch.sh --vnc localhost:5900 --listen %\(ENV_PORT\)s"\n\n[program:fluxbox]\ncommand=fluxbox\nenvironment=DISPLAY=\":99\"" > supervisord.conf'
        })
        
        session.install({
            "name": "supervisor",
            "description": "Start supervisor and noVNC",
            "cwd": "/home/ubuntu",
            "optional": false
        },
        {
            "bash": 'sudo supervisord -c supervisord.conf'
        });
        
        
        
        session.start();
        
    };

});