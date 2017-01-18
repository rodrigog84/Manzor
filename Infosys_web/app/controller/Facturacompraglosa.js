Ext.define('Infosys_web.controller.Facturacompraglosa', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['facturaglosa.Items',
             'Facturaglo',
             'Clientes',
             'FacturaCompras',
             'ProductosE',
             'Tipo_documento',
             'Sucursales_clientes',
             'Tipo_documento.Selector5'],

    models: ['facturaglosa.Item',
             'Facturaglo',
             'Tipo_documento',
             'Sucursales_clientes'],

    views: ['facturacompraglosa.Facturacompraglosa',
            'facturacompraglosa.BuscarProveedores',
            'facturacompraglosa.BuscarSucursales',
            'compras.Principalfactura'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'facturacompraglosaingresar',
        selector: 'facturacompraglosaingresar'
    },{
        ref: 'buscarsucursalesproveedoresfacturaglosa',
        selector: 'buscarsucursalesproveedoresfacturaglosa'
    },{
        ref: 'buscarsucursalesproveedoresfacturaglosa',
        selector: 'buscarsucursalesproveedoresfacturaglosa'
    },{
        ref: 'facturascomprasprincipal',
        selector: 'facturascomprasprincipal'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'facturacompraglosaingresar #rutId': {
                specialkey: this.special
            },

            'facturacompraglosaingresar #numfactId': {
                specialkey: this.special2
            },

            'facturascomprasprincipal button[action=mfacturaglosa]': {
                click: this.mfacturaglosa
            },
           
            'facturacompraglosaingresar button[action=buscarsucursalesproveedoresfacturaglosa]': {
                click: this.buscarsucursalesproveedoresfacturaglosa
            },
            'facturacompraglosaingresar button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'facturacompraglosaingresar button[action=buscarsucursalfacturaglosa]': {
                click: this.buscarsucursalfacturaglosa
            },
            'facturacompraglosaingresar button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'facturacompraglosaingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'facturacompraglosaingresar #nombreId': {
                click: this.special
            },

            'facturacompraglosaingresar #netoId': {
                specialkey: this.calculaiva
            },            

            'facturacompraglosaingresar button[action=validarut]': {
                click: this.validarut
            },
            'facturacompraglosaingresar button[action=grabarfacturaglosa]': {
                click: this.grabarfacturaglosa
            },
            'buscarsucursalesproveedoresfacturaglosa button[action=buscar]': {
                click: this.buscar
            },
            'buscarsucursalesproveedoresfacturaglosa button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarsucursalesproveedoresfacturaglosa button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'facturacompraglosaingresar #tipocondpagoId': {
                select: this.selecttipocondpago                
            },
            'facturacompraglosaingresar #fechafacturaId': {
                select: this.selecttipocondpago
            },
            'facturacompraglosaingresar button[action=agregarItem]': {
                click: this.agregarItem
            }, 
            'facturacompraglosaingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'facturacompraglosaingresar #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'facturacompraglosaingresar #numfacturaId': {
                specialkey: this.special7,
                //blur: this.validanumfact              
            },


            
        });
    },

    special7: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validanumfact()
        };

        if (e.getKey() == e.TAB) {
           this.validanumfact()
        };
    },

    validanumfact: function(){

        var viedit = this.getFacturacompraglosaingresar();
        var numfactura = viedit.down('#numfacturaId').getValue();
        var idproveedor = viedit.down('#id_cliente').getValue();
        var SI = "SI";
        var NO = "NO";
        var CERO = "";
        if (!idproveedor){
            Ext.Msg.alert('Debe ingresar Rut');
            return;
        };

        Ext.Ajax.request({
            url: preurl + 'compras/validanumero',
            params: {
                idproveedor: idproveedor,
                numfactura : numfactura
                
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {

                    //viedit.down('#valfacturaId').setValue(SI);
                    viedit.down('#numfacturaId').setValue(CERO);
                    Ext.Msg.alert('Factura Ya existe para Cliente');
                    return;                                   

                }else{

                    viedit.down('#valfacturaId').setValue(NO);
                    
                };
        }
        });       

    },


    validaboleta: function(){

        var view =this.getfacturacompraglosaingresar();
        var rut = view.down('#rutId').getValue();
        var cero = "";
        var cero1 = "";
        
        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)
                        view.down("#rutId").setValue(rut)
                        view.down('#finaltotalId').setValue(Ext.util.Format.number(cero, '0,000'));
                        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finalafectoId').setValue(Ext.util.Format.number(cero1, '0'));                      
                    }
                    
                }
            }

        });       
       
    },

    selectItemdocuemento: function() {
        
        var view =this.getfacturacompraglosaingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var stCombo = tipo_documento.getStore();
        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        var cero = "";
        var cero1 = "";
        
        var nombre = (record.id);    
        habilita = false;
        if(nombre == 101 || nombre == 103){ // FACTURA ELECTRONICA

            // se valida que exista certificado
            response_certificado = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/existe_certificado/'});

            var obj_certificado = Ext.decode(response_certificado.responseText);

            if(obj_certificado.existe == true){


                //buscar folio factura electronica
                // se buscan folios pendientes, o ocupados hace más de 4 horas

                response_folio = Ext.Ajax.request({
                async: false,
                url: preurl + 'facturas/folio_documento_electronico/'+nombre});  
                var obj_folio = Ext.decode(response_folio.responseText);
                nuevo_folio = obj_folio.folio;
                if(nuevo_folio != 0){
                    view.down('#numfacturaId').setValue(nuevo_folio);  
                    habilita = true;
                }else{
                    Ext.Msg.alert('Atención','No existen folios disponibles');
                    view.down('#numfacturaId').setValue('');  

                    //return
                }

            }else{
                    Ext.Msg.alert('Atención','No se ha cargado certificado');
                    view.down('#numfacturaId').setValue('');  
            }


        }else{        
         Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down('#numfacturaId').setValue(correlanue);
                    
                }else{
                    Ext.Msg.alert('Correlativo Existe');
                    return;
                }

            }            
        });
        }
        var grid  = view.down('#itemsgridId');
        view.down('#finaltotalId').setValue(Ext.util.Format.number(cero, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(cero1, '0'));        

        
        //var bolDisabled = tipo_documento.getValue() == 2 ? true : false; // campos se habilitan sólo en factura
        var bolDisabled = tipo_documento.getValue() == 1 || tipo_documento.getValue() == 19 || ((tipo_documento.getValue() == 101 || tipo_documento.getValue() == 103) && habilita) ? false : true; // campos se habilitan sólo en factura o factura electronica

        if(bolDisabled == true){  // limpiar campos
           view.down('#rutId').setValue('19');
           this.validaboleta();
           
        }

        //view.down('#rutId').setDisabled(bolDisabled);
        //view.down('#buscarBtn').setDisabled(bolDisabled);
        //view.down('#nombre_id').setDisabled(bolDisabled);
        //view.down('#direccionId').setDisabled(bolDisabled);
        //view.down('#giroId').setDisabled(bolDisabled);
        //view.down('#tipoCiudadId').setDisabled(bolDisabled);
        //view.down('#tipoComunaId').setDisabled(bolDisabled);
        //view.down('#sucursalId').setDisabled(bolDisabled);
        //view.down('#tipoVendedorId').setDisabled(bolDisabled);
        //view.down('#tipocondpagoId').setDisabled(bolDisabled);
        grid.getStore().removeAll();  
        
    },

           
    calculaiva: function(){

        var view = this.getFacturacompraglosaingresar();
        var tipo_documento = view.down('#tipoDocumentoId').getValue();
        if (tipo_documento == 19 || tipo_documento == 103 ){
            var iva = 0;
            var neto = view.down('#netoId').getValue();
            view.down('#totalId').setValue(neto);
            view.down('#ivaId').setValue(iva);
        }else if (tipo_documento == 2 ){
            
            var iva = 0;
            var neto = view.down('#netoId').getValue();
            view.down('#totalId').setValue(neto);
            view.down('#ivaId').setValue(iva);

        }else{
        var neto = view.down('#netoId').getValue();
        var iva = (((neto * 19) / 100));
        var total = (neto + iva);
        view.down('#ivaId').setValue(iva);
        view.down('#totalId').setValue(total);
        };
    },


    buscarnota: function(){        
        var view = this.getFacturaglosaprincipal();
        var st = this.getfacturaglosaStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },   
    

    recalcularFinal: function(){
        var view = this.getFacturacompraglosaingresar();
        var stItem = this.getProductosItemsStore();
        var pretotal = 0;
        var total = 0;
        
        stItem.each(function(r){
            pretotal = ((pretotal) + (r.data.totaliva))
          
        });
        total = pretotal;
        neto = (total / 1.19);
        afecto = neto;
        iva = total - neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
          
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },


    agregarItem: function() {

        var view = this.getFacturacompraglosaingresar();
        var tipo_documento = view.down('#tipoDocumentoId').getValue();
        var rut = view.down('#rutId').getValue();
        var stItem = this.getFacturaglosaItemsStore();;        
        var glosa = view.down('#glosaId').getValue();
        var neto = view.down('#netoId').getValue();
        var iva = view.down('#ivaId').getValue();
        var total = view.down('#totalId').getValue();
        var totalfin = view.down('#finaltotalpostId').getValue();
        var netofin = view.down('#finalafectoId').getValue();
        var ivafin = view.down('#finaltotalivaId').getValue();


        if(!glosa){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Glosa.');
            return false;
        };

        if(glosa.length > 70){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Glosa no puede contener más de 70 caracteres.');
            return false;
        };        
        
        if (tipo_documento == 19  || tipo_documento == 103){
        
        if(neto==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
        }; 
        
        if(total==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
        };
        
        }else if (tipo_documento == 2){

             if(neto==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
            }; 
            
            if(total==0 ){  // se validan los datos sólo si es factura
                Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
                return false;
            };         


        }else{

            if(neto==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
            }; 
            
            if(iva==0 ){  // se validan los datos sólo si es factura
                Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
                return false;
            }; 

            if(total==0 ){  // se validan los datos sólo si es factura
                Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
                return false;         


        };
        
        };  
        
                   
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        };

        if (tipo_documento == 2){

             var iva = 0;
             var total = neto;

        };
        
          

        stItem.add(new Infosys_web.model.facturaglosa.Item({
                    glosa: glosa,
                    neto: neto,
                    iva: iva,
                    total: total             
        }));
       
        cero="";
        cero2=0;
        view.down('#glosaId').setValue(cero);
        view.down('#netoId').setValue(cero2);
        view.down('#ivaId').setValue(cero2);
        view.down('#totalId').setValue(cero2);

        if (tipo_documento = 2){
        
            totalfin = totalfin + total;
            ivafin = ivafin + iva;
            netofin = netofin + neto;

        }else{
            
            totalfin = totalfin + total;
            ivafin = ivafin + iva;
            netofin = netofin + neto;

        };
      
        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
    },

    eliminaritem: function() {
        var view = this.getFacturacompraglosaingresar();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var total = ((total) - (row.data.total));
            var neto = ((neto) - (row.data.neto));
            var iva = ((iva) - (row.data.iva));
            var afecto = neto;
            view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));

            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    
    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    special2: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validafactura()
        }
    },
  
    
    selecttipocondpago: function() {
        
        var view =this.getFacturacompraglosaingresar();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();                

        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;
        
        Ext.Ajax.request({
            url: preurl + 'facturas/calculofechas',
            params: {
                dias: dias,
                fechafactura : fechafactura
            },
            success: function(response){
               var resp = Ext.JSON.decode(response.responseText);
               var fecha_final= resp.fecha_final;
               view.down("#fechavencId").setValue(fecha_final);
                           
            }
           
        });
       
            
    },

    seleccionarsucursalcliente: function(){

        var view = this.getBuscarsucursalesproveedoresfacturaglosa();
        var viewIngresa = this.getFacturacompraglosaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscar: function(){

        var view = this.getBuscarsucursalesproveedoresfacturaglosa()
        var st = this.getProveedoresStore()
        var nombre = view.down('#nombreId').getValue()
        var opcion = view.down('#tipoSeleccionId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    buscarsucursalfacturaglosa: function(){

       var busca = this.getFacturacompraglosaingresar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.facturaglosa.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }
      
    },

    seleccionarcliente: function(){

        var view = this.getBuscarsucursalesproveedoresfacturaglosa();
        var viewIngresa = this.getFacturacompraglosaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#giroId').setValue(row.data.giro);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            view.close();
            var condicion = viewIngresa.down('#tipocondpagoId');
            var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
            var stCombo = condicion.getStore();
            var record = stCombo.findRecord('id', condicion.getValue()).data;
            dias = record.dias;
        
            Ext.Ajax.request({
                url: preurl + 'facturas/calculofechas',
                params: {
                    dias: dias,
                    fechafactura : fechafactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);
                   var fecha_final= resp.fecha_final;
                   viewIngresa.down("#fechavencId").setValue(fecha_final);
                               
            }
           
        });
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };

        this.validanumfact();

              
    },
           
    grabarfacturaglosa: function() {

        var viewIngresa = this.getFacturacompraglosaingresar();
        var tipo_documento = viewIngresa.down('#tipoDocumentoId').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idtipo= viewIngresa.down('#tipoDocumentoId').getValue();
        var idsucursal = viewIngresa.down('#id_sucursalID').getValue();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var numdocumento = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getFacturaglosaItemsStore();
        var stFactura = this.getFacturaComprasStore();
        var valfactura = viewIngresa.down('#valfacturaId').getValue();
        
        if (valfactura=="NO"){       
        
        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
        }

       
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'facturacompraglosa/save',
            params: {
                idcliente: idcliente,
                numdocumento: numdocumento,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo: idtipo,
                idbodega: idbodega,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stFactura.load();
                 window.open(preurl + 'facturacompraglosa/exportfacturaglosaPDF/?idfactura='+idfactura);

            }
           
        });
        
        
        }else{
            
            var numfactura = viewIngresa.down('#numfacturaId').getValue();
            var idproveedor = viewIngresa.down('#id_cliente').getValue();
            console.log("llegamos");
            Ext.Ajax.request({
                url: preurl + 'compras/validanumero',
                params: {
                    idproveedor: idproveedor,
                    numfactura : numfactura
                    
                },
                success: function(response){
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.success == true) {

                        var bolEnable = false;               
                        viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
                        Ext.Msg.alert('Factura Ya existe para Cliente');
                        return;                                   

                    }else{

                        if(numdocumento==0){
                        Ext.Msg.alert('Ingrese Datos a La Factura');
                        return;
                        };
                          
                        var dataItems = new Array();
                        stItem.each(function(r){
                            dataItems.push(r.data)
                        });

                        Ext.Ajax.request({
                            url: preurl + 'facturacompraglosa/save',
                            params: {
                                idcliente: idcliente,
                                numdocumento: numdocumento,
                                idsucursal: idsucursal,
                                idcondventa: idcondventa,
                                idtipo: idtipo,
                                idbodega: idbodega,
                                items: Ext.JSON.encode(dataItems),
                                vendedor : vendedor,
                                fechafactura : fechafactura,
                                fechavenc: fechavenc,
                                tipodocumento : tipo_documento,
                                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
                            },
                             success: function(response){
                                var resp = Ext.JSON.decode(response.responseText);
                                var idfactura= resp.idfactura;
                                 viewIngresa.close();
                                 stFactura.load();
                                 window.open(preurl + 'facturacompraglosa/exportfacturaglosaPDF/?idfactura='+idfactura);

                            }
                           
                        });
                 }

                }

                });

            };
            
        var view = this.getFacturacompraglosaingresar();
        var st = this.getFacturaComprasStore();
        st.proxy.extraParams = {documento: idtipo}
        st.load();    
    },

    
    validarut: function(){

        var view =this.getFacturacompraglosaingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.facturacompraglosa.BuscarProveedores');            
                  
        }else{
       
        if(numero>9){            
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;            
        }else{
            if(numero>13){
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;   
            }
        }

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#rutId").setValue(rut)                  
                    }else{
                         Ext.Msg.alert('Rut No Exite');
                         view.down("#rutId").setValue(cero); 
                        return;   
                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      view.down("#rutId").setValue(cero);
                      return;
                      
                }

                //view.close();

            }

        });       
        }

        this.validanumfact();
    },

    mfacturaglosa: function(){

        var viewIngresa = this.getFacturascomprasprincipal();
         var idbodega = viewIngresa.down('#bodegaId').getValue();
         var tipdoc="1";
         if(!idbodega){
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega');
            return;    
         }else{
            var view = Ext.create('Infosys_web.view.facturacompraglosa.Facturacompraglosa').show();
         };

         view.down('#bodegaId').setValue(idbodega);
         view.down('#tipoDocumentoId').setValue(tipdoc);
         view.down('#numfacturaId').focus();
       
    },

    buscarvendedor: function(){

        Ext.create('Infosys_web.view.vendedores.BuscarVendedor').show();
    },

      
});










