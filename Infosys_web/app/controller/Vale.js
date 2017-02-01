Ext.define('Infosys_web.controller.Vale', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['vale',
            'preventa.Items',
            'preventa.Items2',
            'Productosf',
            'ProductosE',
            'Correlativos',
            'Clientes',
            'Sucursales_clientes',
            'Tabladescuento',
            'Tipo_documento.Selector',
            'Preciosdescuentos',
            'facturas.Selector2'
             ],

    models: ['Preventa',
             'preventa.Item',
             'Preciosdescuentos'],

    views: ['vale_despacho.Principal',
            'vale_despacho.Vale_despacho'
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'valedespachoprincipal',
        selector: 'valedespachoprincipal'
    },{    
        ref: 'valedespachoingresar',
        selector: 'valedespachoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'buscarclientespreventa',
        selector: 'buscarclientespreventa'
    },{    
        ref: 'buscarclientespreventa2',
        selector: 'buscarclientespreventa2'
    },{
        ref: 'buscarproductosvaledespacho',
        selector: 'buscarproductosvaledespacho'
    },{
        ref: 'preventaeditar',
        selector: 'preventaeditar'
    },{
        ref: 'buscarproductosvaledespacho2',
        selector: 'buscarproductosvaledespacho2'
    },{
        ref: 'buscarsucursalespreventa',
        selector: 'buscarsucursalespreventa'
    },{
        ref: 'buscarsucursalespreventa2',
        selector: 'buscarsucursalespreventa2'
    },{
        ref: 'observacionesvale2',
        selector: 'observacionesvale2'
    },{
        ref: 'buscarprecios',
        selector: 'buscarprecios'
    },{
        ref: 'autorizacion',
        selector: 'autorizacion'
    },{
        ref: 'autorizacion2',
        selector: 'autorizacion2'
    },{
        ref: 'autorizacion3',
        selector: 'autorizacion3'
    },{
        ref: 'buscarprecios2',
        selector: 'buscarprecios2'
    },{
        ref: 'clientesingresarpreventa',
        selector: 'clientesingresarpreventa'
    },{
        ref: 'observacionesvale',
        selector: 'observacionesvale'
    },{
        ref: 'eliminarpreventa',
        selector: 'eliminarpreventa'
    }
  
    ],
    
    init: function() {
    	
        this.control({

            'valedespachoprincipal button[action=exportarexcelpreventa]': {
                click: this.exportarexcelpreventa
            },
            'valedespachoprincipal button[action=buscarpreventa]': {
                click: this.buscarpreventa
            },
            'topmenus menuitem[action=mvaledespacho]': {
                click: this.mvaledespacho
            },            
            'valedespachoingresar button[action=grabarvaldedespacho]': {
                click: this.grabarvaldedespacho
            },
            'valedespachoingresar button[action=agregarobservaciones]': {
                click: this.agregarobserva
            },
            'preventaeditar button[action=agregarobservaciones2]': {
                click: this.agregarobserva2
            },
            'preventaeditar button[action=grabarpreventa2]': {
                click: this.grabarpreventa2
            },
            'valedespachoprincipal button[action=agregarpreventa]': {
                click: this.agregarpreventa
            },
            'valedespachoprincipal button[action=valedespacho]': {
                click: this.valedespacho
            },
            'agregarpreventa button[action=editarpreventa]': {
                click: this.editarpreventa
            },
            'valedespachoprincipal button[action=cerrarpreventa]': {
                click: this.cerrarpreventa
            },
            'valedespachoingresar button[action=validarut]': {
                click: this.validarut
            },
            'buscarclientespreventa button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarclientespreventa2 button[action=seleccionarcliente2]': {
                click: this.seleccionarcliente2
            },
            'valedespachoingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'preventaeditar button[action=buscarproductos2]': {
                click: this.buscarproductos2
            },
            'valedespachoingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'preventaeditar button[action=buscarprecios2]': {
                click: this.buscarprecios2
            },
            'buscarproductosvaledespacho button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosvaledespacho #nombreId': {
                specialkey: this.special
            },
            'valedespachoingresar #codigoId': {
                specialkey: this.special3
            },
            'buscarproductosvaledespacho button[action=buscar]': {
                click: this.buscarp
            },
            'buscarproductosvaledespacho2 button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'buscarproductosvaledespacho2 #nombreId': {
                click: this.special2
            },
            'buscarproductosvaledespacho2 button[action=buscar2]': {
                click: this.buscarp2
            },
            'valedespachoingresar #productoId': {
                select: this.selectItem
            },
            'preventaeditar #productoId': {
                select: this.selectItem2
            },
            'valedespachoingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'preventaeditar button[action=agregarItem2]': {
                click: this.agregarItem2
            },
            'valedespachoingresar #tipoDocumento2Id': {
                select: this.selectItemdocuemento
            },
            'valedespachoprincipal button[action=exportarpreventa]': {
                click: this.exportarpreventa
            },
            'valedespachoprincipal button[action=editarpreventa]': {
                click: this.editarpreventa
            },
            'valedespachoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
             'preventaeditar button[action=eliminaritem2]': {
                click: this.eliminaritem2
            },
            'valedespachoingresar button[action=editaritem]': {
                click: this.editaritem
            },
             'preventaeditar button[action=editaritem2]': {
                click: this.editaritem2
            },
            'valedespachoingresar button[action=buscarsucursalpreventa]': {
                click: this.buscarsucursalpreventa
            },
            'preventaeditar button[action=buscarsucursalpreventa2]': {
                click: this.buscarsucursalpreventa2
            },
            'buscarsucursalespreventa button[action=seleccionarsucursalpreventa]': {
                click: this.seleccionarsucursalpreventa
            },
            'buscarsucursalespreventa2 button[action=seleccionarsucursalpreventa2]': {
                click: this.seleccionarsucursalpreventa2
            },
            'observacionesvale button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'observacionesvale2 button[action=ingresaobs2]': {
                click: this.ingresaobs2
            },
            'autorizacion button[action=autoriza]': {
                click: this.autorizaprecios
            },
            'autorizacion3 button[action=autoriza3]': {
                click: this.autorizaprecios2
            },
            'autorizacion2 button[action=autoriza1]': {
                click: this.autorizaprecios2
            },
            'observacionesvale button[action=validar]': {
                click: this.validarut2
            },
            'observacionesvale2 button[action=validar2]': {
                click: this.validarut3
            },
            'eliminarpreventa button[action=salirpreventa]': {
                click: this.salirpreventa
            },
            'eliminarpreventa button[action=eliminar]': {
                click: this.eliminar
            },
            'valedespachoprincipal button[action=eliminarpreventa]': {
                click: this.eliminarpreventa
            },
            'valedespachoingresar #bodegadestinoId': {
                select: this.seleccionbodega
            },
            'valedespachoprincipal #bodegaId': {
                select: this.seleccionbodegaprincipal
            },

        });
    },

    seleccionbodegaprincipal: function(){

        var view = this.getValedespachoprincipal();
        var st = this.getValeStore()
        var bodega = view.down('#bodegaId').getValue();
        st.proxy.extraParams = {bodega : bodega,
                                opcion : "Todos"}
        st.load();       

    },

    seleccionbodega: function(){
        var view = this.getValedespachoingresar();
        var cero = "";
        var bodegaa = view.down('#bodegaId');
        var stCombo = bodegaa.getStore();
        var record = stCombo.findRecord('id', bodegaa.getValue()).data;
        var id_cliente = (record.id_cliente); 
        var id_sucursal  = (record.id_sucursal);
        var bodega = view.down('#bodegaId').getValue();
        var bodega2 = view.down('#bodegadestinoId').getValue();
        if (bodega == bodega2){
            view.down('#bodegadestinoId').setValue(cero);
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega Distinta');
            return;
        }else{
            view.down('#id_cliente').setValue(id_cliente);
            view.down('#id_sucursal').setValue(id_sucursal);
        };
        console.log(id_cliente);                 
        console.log(id_sucursal);
    },

    validarut2: function(){

        var view = this.getObservacionesvale();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };

        Ext.Ajax.request({
            url: preurl + 'vale/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    var rutm = resp.rut;
                    if (resp.existe == true){
                        var observa = resp.observa;
                        if (observa){
                         view.down("#nombreId").setValue(observa.nombre);
                         view.down("#rutId").setValue(observa.rut);
                         view.down("#rutmId").setValue(rut);
                         view.down("#camionId").setValue(observa.pat_camion);
                         view.down("#carroId").setValue(observa.pat_carro);
                         view.down("#fonoId").setValue(observa.fono);
                         view.down("#validaId").setValue(okey);
                         view.down("#observaId").focus();
                    }             
                    };
                    if (resp.existe == false){
                        view.down("#nombreId").focus();
                        view.down("#rutId").setValue(rutm);
                        view.down("#rutmId").setValue(rut);
                        view.down("#validaId").setValue(okey);
                    }  
                    
                }else{

                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');                      
                      return false;
                     
                      
                }
               
            }

        });
    },
   
    valedespacho: function(){

         var viewIngresa = this.getValedespachoprincipal();
         var idbodega = viewIngresa.down('#bodegaId').getValue();
         var tipdoc="101";
         var rut ="19";
         var nombre =idbodega;
         var tipo = "2";

         if(!idbodega){
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega');
            return;    
         }else{
                Ext.Ajax.request({
                url: preurl + 'correlativos/generaventa2?valida='+nombre,
                params: {
                    id: 1
                },
                success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.vale_despacho.Vale_despacho').show();                   
                    var correlativo = resp.cliente;
                    var correlanue = correlativo.num_despacho;
                    var correlanue = (parseInt(correlanue) +1);
                    view.down("#ticketId").setValue(correlanue);
                    view.down('#bodegaId').setValue(idbodega);
                    view.down("#codigoId").focus();   
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }
                }            
                });     
             
         }   
       
    },

    eliminar: function(){

        var view = this.getEliminarpreventa()
        var idcliente = view.down('#idclienteID').getValue()
        var st = this.getPreventaStore();
        Ext.Ajax.request({
            url: preurl + 'preventa/elimina2',
            params: {
                idcliente: idcliente                
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Eliminados Exitosamente');
                    return;                                   

                 }else{

                    view.close();
                    st.load();

                    Ext.Msg.alert('Preventa Ya Cancelada No se Elimino');
                    return;
                   
                                         
                 };
        }
        });

        view.close();
        st.load();            
    },

    salirpreventa: function(){

       var view = this.getEliminarpreventa()
       view.close();

    },

    eliminarpreventa: function(){

        var view = this.getvaledespachoprincipal()
       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit =   Ext.create('Infosys_web.view.Preventa.Eliminar').show();
            edit.down('#idclienteID').setValue(row.data.id);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
    },    
    
    buscarpreventa: function(){
        
        var view = this.getValedespachoprincipal();
        var st = this.getPreventaStore()
        var tipo = view.down('#tipoDocumentoId').getValue();
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion,
                                documento: tipo}
        st.load();
    },

               
    ingresaobs2: function(){

        var view = this.getobservacionesvale2();
        var viewIngresar = this.getPreventaeditar();                
        var rut = view.down('#rutmId').getValue();
        var nombre = view.down('#nombreId').getValue();
        var camion = view.down('#camionId').getValue();
        var fono = view.down('#fonoId').getValue();
        var carro = view.down('#carroId').getValue();
        var observa = view.down('#observaId').getValue();
        var valida = view.down('#validaId').getValue();
        var numero = viewIngresar.down('#ticketId').getValue();
        var id = viewIngresar.down('#observaId').getValue();       
        
        var permite = "SI"

        if (valida == "NO"){
             Ext.Msg.alert('Alerta', 'Debe Validar Rut');
                 return;
        };        
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };
        if (!nombre){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Nombre');
                 return;
        };       
       
        Ext.Ajax.request({
            url: preurl + 'preventa/saveobserva',
            params: {
                rut: rut,
                nombre: nombre,
                camion: camion,
                carro : carro,
                fono : fono,
                observa : observa,
                numero: numero,
                id: id
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idobserva = resp.idobserva;         
                view.close();
                viewIngresar.down("#observaId").setValue(idobserva);
                //viewIngresar.down("#permiteId").setValue(permite);
            }           
        });
    },

    agregarobserva2: function(){

         var viewIngresa = this.getPreventaeditar();
         var observa = viewIngresa.down('#observaId').getValue();
         console.log(observa);
         if(observa){
         Ext.Ajax.request({
            url: preurl + 'preventa/getObserva',
            params: {
                idobserva: observa
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true){                
                var observar = (resp.observar);
                var rut = (observar.rut);
                console.log(rut);
                var view = Ext.create('Infosys_web.view.vale_despacho.Observaciones2').show();
                view.down('#rutmId').setValue(observar.rut);
                view.down('#rutId').setValue(observar.rutm);
                view.down('#nombreId').setValue(observar.nombre);
                view.down('#camionId').setValue(observar.pat_camion);
                view.down('#carroId').setValue(observar.pat_carro);
                view.down('#fonoId').setValue(observar.fono);
                view.down('#observaId').setValue(observar.observacion);
                }else{
                var edit = Ext.create('Infosys_web.view.vale_despacho.Observaciones2').show();
                
                };
            }           
            });
        }else{
         var edit = Ext.create('Infosys_web.view.vale_despacho.Observaciones2').show();
         view.down('#rutmId').setValue(observa);

         };        
        
    },

    ingresaobs: function(){

        var view = this.getObservacionesvale();
        var viewIngresar = this.getValedespachoingresar();                
        var rut = view.down('#rutmId').getValue();
        var nombre = view.down('#nombreId').getValue();
        var camion = view.down('#camionId').getValue();
        var fono = view.down('#fonoId').getValue();
        var carro = view.down('#carroId').getValue();
        var observa = view.down('#observaId').getValue();
        var valida = view.down('#validaId').getValue();
        var numero = viewIngresar.down('#ticketId').getValue();
        var id = viewIngresar.down('#observaId').getValue();       
        
        var permite = "SI"

        if (valida == "NO"){
             Ext.Msg.alert('Alerta', 'Debe Validar Rut');
                 return;
        };        
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };
        if (!nombre){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Nombre');
                 return;
        };       
       
        Ext.Ajax.request({
            url: preurl + 'vale/saveobserva',
            params: {
                rut: rut,
                nombre: nombre,
                camion: camion,
                carro : carro,
                fono : fono,
                observa : observa,
                numero: numero,
                id: id
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idobserva = resp.idobserva;         
                view.close();
                viewIngresar.down("#observaId").setValue(idobserva);
                viewIngresar.down("#permiteId").setValue(permite);
                viewIngresar.down("#dobservaId").setValue(observa);
                
            }           
        });
    },

    agregarobserva: function(){

        var viewIngresa = this.getValedespachoingresar();
        var observa = viewIngresa.down('#observaId').getValue();
        var numpreventa = viewIngresa.down('#ticketId').getValue();
        if (!observa){
            var view = Ext.create('Infosys_web.view.vale_despacho.Observaciones').show();
            view.down("#rutId").focus();
            view.down("#preventaId").setValue(numpreventa);          

        }else{
            Ext.Ajax.request({
            url: preurl + 'vale/getObserva',
            params: {
                idobserva: observa
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true){                
                var observar = (resp.observar);
                var rut = (observar.rut);
                console.log(rut);
                var view = Ext.create('Infosys_web.view.vale_despacho.Observaciones').show();
                view.down('#rutmId').setValue(observar.rut);
                view.down('#rutId').setValue(observar.rutm);
                view.down('#nombreId').setValue(observar.nombre);
                view.down('#camionId').setValue(observar.pat_camion);
                view.down('#carroId').setValue(observar.pat_carro);
                view.down('#fonoId').setValue(observar.fono);
                view.down('#observaId').setValue(observar.observacion);
                };
            }           
            });
        }

    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarp()
        }
    },

    special2 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarp2()
        }
    },

    special3 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscacodigo()
        }
    },

   
    buscacodigo : function() {

        var viewIngresa = this.getValedespachoingresar();
        var codigo = viewIngresa.down('#codigoId').getValue();
        var cero = " ";
        var cero1= 0;
        var cero2= 1;

        Ext.Ajax.request({
            url: preurl + 'productos/buscacodigo',
            params: {
                codigo: codigo
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 if (resp.success == true){
                    var cliente= resp.cliente;
                    viewIngresa.down('#productoId').setValue(cliente.id);
                    viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                    viewIngresa.down('#codigoId').setValue(cliente.codigo);
                    var precioventa = (cliente.p_venta);
                    if (cliente.stock < 0){
                        Ext.Msg.alert('Alerta', 'Producto Sin Stock');
                        viewIngresa.down('#codigoId').setValue(cero);
                        viewIngresa.down('#productoId').setValue(cero);
                        viewIngresa.down('#nombreproductoId').setValue(cero);
                        viewIngresa.down('#cantidadId').setValue(cero2);
                        viewIngresa.down('#precioId').setValue(cero1);
                        viewIngresa.down('#cantidadOriginalId').setValue(cero1);
                        return;

                    }else{
                    if (precioventa == 0){
                        var bolEnable = false;
                        viewIngresa.down('#precioId').setDisabled(bolEnable);
                        viewIngresa.down('#precioId').setValue(precioventa);
                        viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                        viewIngresa.down("#precioId").focus();
                        
                    }else{
                        
                        if (cliente.estado == 3){
                        viewIngresa.down('#precioId').setValue(cero);
                        viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                        viewIngresa.down("#precioId").focus();              
                        }else{
                            viewIngresa.down('#precioId').setValue(cliente.p_venta);
                            viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                            viewIngresa.down("#cantidadId").focus();
                        }
                    }

                    }
                 }else{
                    Ext.Msg.alert('Alerta', 'Codigo producto no existe');
                    viewIngresa.down('#codigoId').setValue(cero);
                    viewIngresa.down('#productoId').setValue(cero);
                    viewIngresa.down('#nombreproductoId').setValue(cero);
                    viewIngresa.down('#cantidadId').setValue(cero2);
                    viewIngresa.down('#precioId').setValue(cero1);
                    viewIngresa.down('#cantidadOriginalId').setValue(cero1);
                    return;
                }
                               
            }
           
        });        
    },

    seleccionarsucursalpreventa: function(){

        var view = this.getBuscarsucursalespreventa();
        var viewIngresa = this.getvaledespachoingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    seleccionarsucursalpreventa2: function(){

        var view = this.getBuscarsucursalespreventa2();
        var viewIngresa = this.getPreventaeditar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    
    grabarpreventa2: function(){

        var viewIngresa = this.getPreventaeditar();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idticket = viewIngresa.down('#idId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var sucursal = viewIngresa.down('#id_sucursalID').getValue();
        var producto = viewIngresa.down('#tipoVendedorId');
        if(!producto){
            Ext.Msg.alert('Seleccione Vendedor');
            return;   
        };
        var idgiro = viewIngresa.down('#giroId').getValue();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var id = viewIngresa.down('#idId').getValue();
        var finalafectoId = viewIngresa.down('#finaltotalnetoId').getValue();
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        var vendedor = record.id;
        var fechapreventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getPreventaeditarStore();
        var stPreventa = this.getPreventaStore();
        var observa = viewIngresa.down('#observaId').getValue();
     
        if(!finalafectoId){
            Ext.Msg.alert('Ingrese Productos a la Venta');
            return;   
        }

        if(!idpago){
            Ext.Msg.alert('Ingrese Condicion Venta');
            return;   
        }

        
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'preventa/save2',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                idtipo : idtipo,
                idpago : idpago,
                idbodega: idbodega,
                observa: observa,
                sucursal: sucursal,
                numeroticket : numeroticket,
                idticket : idticket,
                fechapreventa : fechapreventa,
                descuento : viewIngresa.down('#descuentovalorId').getValue(),
                neto : viewIngresa.down('#finalafectoId').getValue(),
                iva : viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idpreventa= resp.idpreventa;
                 viewIngresa.close();
                 stPreventa.load();
                 window.open(preurl + 'preventa/exportPDF/?idpreventa='+id);
               
            }
           
        });
       
    },

    selectItem2: function() {

        var view = this.getPreventaeditar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    agregarItem2: function() {

        var view = this.getPreventaeditar();
        var tipo_documento = view.down('#tipoDocumento2Id').getValue();
        var rut = view.down('#rutId').getValue();
        var direccion = view.down('#direccionId').getValue();
        var stItem = this.getPreventaeditarStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var secuencia = view.down('#secuenciaId').getValue();
        var bolEnable = true;
        var secuencia = secuencia + 1;
        
        if (secuencia > 21 & tipo_documento !=2 ){

           Ext.Msg.alert('Alerta', 'Ya sobrepaso el maximo de Registros');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#precioId').setValue(cero);
                return;           

        };

        if (secuencia > 8 & tipo_documento ==2 ){

           Ext.Msg.alert('Alerta', 'Ya sobrepaso el maximo de Registros');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#precioId').setValue(cero);
                return; 
            

        };                    
       
        var cero = "";
        var cero1= 0;
        var cero2= 0;
        
        var tot = ((cantidad * precio));
        var neto = (Math.round(tot / 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = ((neto + iva ));

        
        if(!producto){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;
        }

        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }

        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }
        
        if(!direccion){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;           
        }

        stItem.each(function(r){
            if(r.data.id_producto == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero2);
                view.down('#descuentoId').setValue(cero1);
                view.down('#precioId').setValue(cero1);
                view.down('#totdescuentoId').setValue(cero); 
                view.down('#cantidadOriginalId').setValue(cero1);

                return; 
            }
        });
        if(exists == 1)
            return;
        
        stItem.add(new Infosys_web.model.preventa.Item({
            secuencia: secuencia,
            id_producto: producto,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva         
            
        }));

        this.recalcular();

        cero="";
        cero1=0;
        cero2=0;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        
    },

    editarpreventa: function(){

        var stItms = Ext.getStore('Preventaeditar');
        stItms.removeAll();
       
        var view = this.getValedespachoprincipal();       
                   
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var view = this.getPreventaeditar();
            var stItem = this.getPreventaeditarStore();
            var idpreventa = row.data.id;
            var idvendedor = row.data.id_vendedor;
            stItem.proxy.extraParams = {idpreventa : idpreventa};
            stItem.load();

            Ext.Ajax.request({
            url: preurl +'preventa/edita/?idpreventa=' + row.data.id,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {                    
                    var view = Ext.create('Infosys_web.view.Preventa.EditarPreventa').show();                   
                    var cliente = resp.cliente;
                    var secuencia = resp.secuencia;
                    if (cliente.id_sucursal == 0){
                        view.down("#direccionId").setValue(cliente.direccion);
                    }else{
                        view.down("#id_sucursalID").setValue(cliente.id_sucursal);
                        view.down("#direccionId").setValue(cliente.direccion_sucursal);
                    };                            
                    view.down("#ticketId").setValue(cliente.num_ticket);
                    view.down("#giroId").setValue(cliente.nom_giro);
                    view.down("#idId").setValue(cliente.id);
                    view.down("#tipoDocumento2Id").setValue(cliente.id_tip_docu);
                    view.down("#fechaventaId").setValue(cliente.fecha_venta);                    
                    view.down("#id_cliente").setValue(cliente.id_cliente);
                    view.down("#rutId").setValue(cliente.rut_cliente);
                    view.down("#rutId").setValue(cliente.rut_cliente);
                    view.down("#nombre_id").setValue(cliente.nom_cliente);
                    view.down("#tipocondpagoId").setValue(cliente.id_pago);
                    view.down("#tipoVendedorId").setValue(idvendedor);
                    view.down("#observaId").setValue(cliente.id_observa);
                    view.down("#bodegaId").setValue(cliente.id_bodega);
                    var total = (cliente.total);
                    var neto = (cliente.neto);
                    var iva = (cliente.total - cliente.neto);
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#descuentovalorId').setValue(Ext.util.Format.number(cliente.desc, '0'));
                    view.down("#secuenciaId").setValue(secuencia);
                     
                }else{
                    Ext.Msg.alert('Correlativo no Existe');
                    return;
                }

            }
            
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
       
       
    },

    eliminaritem2: function() {
        var view = this.getPreventaeditar();

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


    eliminaritem: function() {
        var view = this.getValedespachoingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        this.recalcularFinal();       
    },

    editaritem: function() {

        var view = this.getValedespachoingresar();
        var grid  = view.down('#itemsgridId');
        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;

            
            Ext.Ajax.request({
            url: preurl + 'productos/buscarp?nombre='+id_producto,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) { 
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#nombreproductoId').setValue(row.data.nombre);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(cliente.stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);
                                                     
                    }
                }
            }

        });
        grid.getStore().remove(row);
        this.recalcularFinal();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    editaritem2: function() {
        var view = this.getPreventaeditar();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var afecto = view.down('#finalafectoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;
            var totalnue = total - (row.data.total);
            var ivanue = iva - (row.data.iva);
            var afectonue = afecto - (row.data.neto);
            var netonue = neto - (row.data.neto);

            Ext.Ajax.request({
            url: preurl + 'productos/buscarp?nombre='+id_producto,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) { 
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#nombreproductoId').setValue(row.data.nombre);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(cliente.stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);                                                
                        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
                        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
                        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
                        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
                        view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
                        view.down('#descuentovalorId').setValue(Ext.util.Format.number(cero));
       
                    }
                }
            }

        });
        grid.getStore().remove(row);
        //this.recalcularFinal();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    exportarpreventa: function(){
        var view = this.getValedespachoprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'vale/exportPDF/?idpreventa=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

        exportarexcelpreventa: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getValedespachoprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }          
          i++;
        })   
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPreventa?cols='+Ext.JSON.encode(jsonCol));
 
    },

    recalcular: function(){

        var view = this.getPreventaeditar();
        var stItem = this.getPreventaeditarStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        
        stItem.each(function(r){
            pretotal = pretotal + (parseInt(r.data.total));
            //iva = iva + r.data.iva
            //neto = neto + r.data.neto
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;

        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
    },
    
    recalcularFinal: function(){

        var view = this.getValedespachoingresar();
        var stItem = this.getPreventaItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        //var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + (parseInt(r.data.total))
            //iva = iva + r.data.iva
            //neto = neto + r.data.neto
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#descuentovalorId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
    },

    recalcularFinal2: function(){

        var view = this.getPreventaeditar();
        var stItem = this.getPreventaItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

         stItem.each(function(r){
            pretotal = pretotal + (parseInt(r.data.total))
            iva = iva + r.data.iva
            neto = neto + r.data.neto
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
    },


    agregarItem: function() {

        var view = this.getValedespachoingresar();
        var stItem = this.getPreventaItemsStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var bodegasalida = ((view.down('#bodegaId').getValue()));
        var bodegadestino = ((view.down('#bodegadestinoId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var secuencia = view.down('#secuenciaId').getValue();
        var bolEnable = true;
        var secuencia = secuencia + 1;
                  
        if (secuencia > 21 ){

           Ext.Msg.alert('Alerta', 'Ya sobrepaso el maximo de Registros');
            exists = 1;
            cero="";
            view.down('#codigoId').setValue(cero);
            view.down('#productoId').setValue(cero);
            view.down('#nombreproductoId').setValue(cero);
            view.down('#cantidadId').setValue(cero);
            view.down('#cantidadOriginalId').setValue(cero);
            view.down('#precioId').setValue(cero);
            return;           

        };

                
        var tot = ((cantidad * precio));
        var neto = (Math.round(tot / 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = ((neto + iva ));
        
        if(!producto){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;
        }

        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }

        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }       
      
        stItem.each(function(r){
            if(r.data.id_producto == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#totdescuentoId').setValue(cero);                
                view.down('#precioId').setValue(cero);
                return; 
            }
        });

        if(exists == 1)
            return;
        
        stItem.add(new Infosys_web.model.preventa.Item({
            id: secuencia,
            id_producto: producto,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva
        }));
        this.recalcularFinal();

        cero="";
        cero1=0;
        cero2=0;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#secuenciaId').setValue(secuencia);        
        view.down("#buscarproc").focus();
    },

    selectItem: function() {

        var view = this.getValedespachoingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    
    seleccionarproductos: function(){

        var view = this.getBuscarproductosvaledespacho();
        var viewIngresa = this.getValedespachoingresar();
        var estado = viewIngresa.down('#estadoId').getValue();        
        var cero = 0;
        var cero2 = "";
        var cero1 = "";
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            var precioventa = (row.data.p_venta);
            if (row.data.stock < 0){
                        view.close();
                        Ext.Msg.alert('Alerta', 'Producto Sin Stock');
                        viewIngresa.down('#codigoId').setValue(cero);
                        viewIngresa.down('#productoId').setValue(cero);
                        viewIngresa.down('#nombreproductoId').setValue(cero);
                        viewIngresa.down('#cantidadId').setValue(cero2);
                        viewIngresa.down('#precioId').setValue(cero1);
                        viewIngresa.down('#cantidadOriginalId').setValue(cero1);
                        return;

                           
            }else{
            if (precioventa == 0){
                var bolEnable = false;
                viewIngresa.down('#precioId').setDisabled(bolEnable);
                viewIngresa.down('#precioId').setValue(precioventa);
                viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                view.close();
                viewIngresa.down("#precioId").focus();
                
            }else{
                
                if (estado == 3){
                viewIngresa.down('#precioId').setValue(cero);
                viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                view.close();  
                viewIngresa.down("#precioId").focus();              
                }else{
                    viewIngresa.down('#precioId').setValue(row.data.p_venta);
                    viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                    view.close();
                    viewIngresa.down("#cantidadId").focus();
                }
            }
        }  
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        var bolEnable = false;
        viewIngresa.down('#buscarprec').setDisabled(bolEnable);
                        
       
    },

    seleccionarproductos2: function(){

        var view = this.getbuscarproductosvaledespacho2();
        var viewIngresa = this.getPreventaeditar();
        var estado = viewIngresa.down('#estadoId').getValue();        
        var cero = 0;
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_productos);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            var precioventa = (row.data.p_venta);
            if (precioventa == 0){
                var bolEnable = false;
                viewIngresa.down('#precioId').setDisabled(bolEnable);
                viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                view.close();
                viewIngresa.down("#precioId").focus();                
            }else{                
                if (estado == 3){
                viewIngresa.down('#precioId').setValue(cero);
                viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                view.close();  
                viewIngresa.down("#precioId").focus();              
                }else{
                    viewIngresa.down('#precioId').setValue(row.data.p_venta);
                    viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
                    view.close();
                    viewIngresa.down("#cantidadId").focus();
                }
            }
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
             
       
    },

    buscarproductos: function(){

        var busca = this.getValedespachoingresar()
        var idbodega = busca.down('#bodegaId').getValue();
        var st = this.getProductosEStore();
        st.proxy.extraParams = {opcion : idbodega};
        st.load();
        var edit = Ext.create('Infosys_web.view.vale_despacho.BuscarProductos').show();
        edit.down('#bodegaId').setValue(idbodega);
        edit.down("#nombreId").focus();
      
    },

    buscarproductos2: function(){

        var busca = this.getPreventaeditar()
        var idbodega = busca.down('#bodegaId').getValue();
        var st = this.getProductosEStore();
        st.proxy.extraParams = {opcion : idbodega};
        st.load();
        var edit = Ext.create('Infosys_web.view.vale_despacho.BuscarProductos2').show();
        edit.down('#bodegaId').setValue(idbodega);
        edit.down("#nombreId").focus();
    },

    buscarp: function(){
        var view = this.getBuscarproductosvaledespacho();
        var st = this.getProductosEStore()
        var nombre = view.down('#nombreId').getValue()
        var bodega = view.down('#bodegaId').getValue()
        st.proxy.extraParams = {opcion : bodega,
                                tipo : "Nombre",
                                nombre: nombre}
        st.load();
    },

    buscarp2: function(){
        var view = this.getBuscarproductosvaledespacho2();
        var st = this.getProductosEStore()
        var nombre = view.down('#nombreId').getValue()
        var bodega = view.down('#bodegaId').getValue()
        st.proxy.extraParams = {opcion : bodega,
                                tipo : "Nombre",
                                nombre: nombre}
        st.load();
    },

    mvaledespacho: function(){       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'valedespachoprincipal'});
    },
    
    grabarvaldedespacho: function(){

        var viewIngresa = this.getValedespachoingresar();
        var numerovale = viewIngresa.down('#ticketId').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idsucursal = viewIngresa.down('#id_sucursal').getValue();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var idbodega2 = viewIngresa.down('#bodegadestinoId').getValue();
        var finalafectoId = viewIngresa.down('#finaltotalnetoId').getValue();
        var fechapreventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getPreventaItemsStore();
        var stVale = this.getValeStore();
        var observa = viewIngresa.down('#observaId').getValue();
        var observacion = viewIngresa.down('#dobservaId').getValue();
        if(!finalafectoId){
            Ext.Msg.alert('Ingrese Productos a la Venta');
            return;   
        }
             
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'vale/save',
            params: {
                items: Ext.JSON.encode(dataItems),
                observa: observa,
                observacion: observacion,
                idcliente : idcliente,
                idsucursal : idsucursal,
                idbodega : idbodega,
                idbodega2 : idbodega2,
                numerovale : numerovale,
                fechapreventa : fechapreventa,
                neto : viewIngresa.down('#finalafectoId').getValue(),
                iva : viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idpreventa= resp.idpreventa;
                viewIngresa.close();
                stVale.load();
                window.open(preurl + 'vale/exportPDF/?idpreventa='+idpreventa);
            }
           
        });
       
    },       
    
    cerrarpreventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










