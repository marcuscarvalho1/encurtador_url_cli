export class Context{
    
    public static consultaContextPath(){
        return window.location.protocol + "//" + window.location.hostname + (window.location.port == "80" ? "" : ":" + window.location.port); 
    }
    
    public static consultaRequestPath(){
        return window.location.pathname.substring(1);
    }
}
