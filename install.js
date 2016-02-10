define(function(require, exports, module) {

    module.exports = function(session, options){
    
        session.start();
        
        session.install({
            "name": "Desktop",
            "description": "Installs X11 and NoVNC",
            "optional": false
        },
        {
            "ubuntu": ["supervisor", "xvfb", "fluxbox", "x11vnc"]
        },
        {
            "bash": 'git clone git://github.com/kanaka/noVNC'
        });
        
    };

});