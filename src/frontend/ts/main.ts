declare const M;
class Main implements EventListenerObject, ResponseLister {
    public framework: FrameWork = new FrameWork();
    
    constructor() {
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)      
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let respuesta: Array<Device> = JSON.parse(resputaString);
            let divDevices = document.getElementById("divDevices");

            let datosVisuale:string = `<ul class="collection">`
            for (let disp of respuesta) {
                datosVisuale += ` <li class="collection-item avatar">`;
                if (disp.type == 1) {
                    datosVisuale += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                } else if (disp.type == 0) {
                    datosVisuale += `<img src="../static/images/window.png" alt="" class="circle">`;
                }
                
                datosVisuale += `<span class="title nombreDisp">${disp.name}</span>
                <p>${disp.description}
                </p>

                <a href="#!" class="secondary-content">
                <div class="switch">
                <label>
                  Off`
                  if (disp.state == true) {
                    datosVisuale += `<input type="checkbox" checked id="cb_${disp.id} ">`;
                } else if (disp.state == false){ 
                    datosVisuale += `<input type="checkbox" id="cb_${disp.id} ">`;
                }
                datosVisuale += `<span class="lever"></span>
                  On
                </label>
              </div>
                </a>
              </li>`
            }
            datosVisuale += `</ul>`
            divDevices.innerHTML = datosVisuale;

            //agregamos evento al botón actualizar
            let btn=document.getElementById("btn1");
            btn.addEventListener("click",this);
        
          } else {
              alert("Algo salio mal")
          }
    }
    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se acutlizo correctamente")    
        } else {
            alert("Error")    
        }
        
    }
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLElement>e.target;
      
        if (e.type == "click") {

            console.log("Se hizo click para prender o apagar");
            let inputElemento= <HTMLInputElement>this.framework.recuperarElemento("inputDescripcion");
            let datos = { "id": 1, "description": inputElemento.value};
            console.log(datos);
            this.framework.ejecutarRequest("POST","http://localhost:8000/devices", this,datos)
            
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");
    M.updateTextFields();
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1, "");
    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnDoble");
    let main: Main = new Main();

    btn2.addEventListener("dblclick", main);
    btn.addEventListener("click", main);

});







