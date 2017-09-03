Ext.define('Infosys_web.controller.Compras', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['productos.Items',
             'facturas.Items',
             'FacturaCompras',
             'ProductosE',
             'Proveedores',
             'Tipo_documento',
             'Sucursales_clientes',
             'Tipo_documento.Selector5',
             'facturas.Selector3'],

    models: ['Facturas.Item',
             'Factura',
             'Tipo_documento',
             'Sucursales_clientes',
             'Cargadteproveedores'],

    views: [ 'compras.Facturas',
             'compras.BuscarProveedores',
             'compras.Principalfactura',
             'compras.BuscarSucursales',
             'compras.BuscarProductos',
             'compras.Exportar',
             'compras.Exportartxt',
             'compras.Observaciones',
             'compras.Eliminar'
          ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'facturascomprasingresar',
        selector: 'facturascomprasingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'facturascomprasprincipal',
        selector: 'facturascomprasprincipal'
    },{        
        ref: 'buscarproveedores',
        selector: 'buscarproveedores'
    },{
        ref: 'buscarsucursalesclientescompras',
        selector: 'buscarsucursalesclientescompras'
    },{
        ref: 'formularioexportarcompras',
        selector: 'formularioexportarcompras'
    },{
        ref: 'formularioexportarpdfcompras',
        selector: 'formularioexportarpdfcompras'
    },{
        ref: 'observacionesfacturasdirectas',
        selector: 'observacionesfacturasdirectas'
    },{
        ref: 'buscarsucursalesclientescompras',
        selector: 'buscarsucursalesclientescompras'
    },{
        ref: 'buscarproductosfacturascompras',
        selector: 'buscarproductosfacturascompras'
    },{
        ref: 'eliminarcompra',
        selector: 'eliminarcompra'
    }  
    
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'facturascomprasingresar #rutId': {
                specialkey: this.special
            },

            'facturascomprasprincipal button[action=mfactura]': {
                click: this.mfactura
            },
           
            'topmenus menuitem[action=mcompras]': {
                click: this.mcompras
            },
            'facturascomprasingresar button[action=buscarsucursalfactura]': {
                click: this.buscarsucursalfactura
            },
            'facturascomprasingresar button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'facturascomprasingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'facturascomprasingresar button[action=validarut]': {
                click: this.validarut
            },
            'facturascomprasingresar button[action=grabarfactura]': {
                click: this.grabarfactura
            },
            'facturascomprasprincipal button[action=cerrarfactura]': {
                click: this.cerrarfactura
            },
            'facturascomprasprincipal button[action=generarfacturapdf]': {
                click: this.generarfacturapdf
            },

            'facturascomprasprincipal button[action=exporttxt]': {
                click: this.exporttxt
            },

            'facturascomprasprincipal button[action=generarfacturacediblepdf]': {
                click: this.generarfacturacediblepdf
            },
                    
            'buscarproveedores button[action=buscar]': {
                click: this.buscar
            },
            'buscarproveedores button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarproductosfacturascompras button[action=seleccionarproductos]': {
                click: this.seleccionarproductoscompras
            },
            'buscarproductosfacturascompras button[action=buscar]': {
                click: this.buscarp
            },            
            'facturascomprasingresar #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'facturascomprasprincipal #tipoDocumentoId': {
                select: this.buscarfacturasgrilla
            },
                        
            'buscarsucursalesclientescompras button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'facturascomprasingresar #tipocondpagoId': {
                select: this.selecttipocondpago
            },
            'facturascomprasprincipal button[action=exportarexcelfacturas]': {
                click: this.exportarexcelfacturas
            },
            'facturascomprasprincipal button[action=generarlibropdf]': {
                click: this.generarlibropdf
            },            
            'formularioexportarcompras button[action=exportarExcelFormulario]': {
                click: this.exportarExcelFormulario
            },
            'formularioexportarpdfcompras button[action=exportarPdfFormulario]': {
                click: this.exportarPdfFormulario
            },            
            'facturascomprasingresar button[action=observaciones]': {
                click: this.observaciones
            },
            'observacionesfacturasdirectas button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'facturascomprasingresar #tipocondpagoId': {
                select: this.condicionpago
            },
            'facturascomprasingresar #DescuentoproId': {
                change: this.changedctofinal3
            },
            'facturascomprasingresar #tipoDescuentoId': {
                change: this.changedctofinal
            },
            'formularioexportartxt button[action=exporttxtfechas]': {
                click: this.exporttxtfechas
            },
             'facturascomprasingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
             'facturascomprasingresar button[action=editaritem]': {
                click: this.editaritem
            },
            'facturascomprasingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'eliminarcompra button[action=salircompra]': {
                click: this.salircompra
            },
            'eliminarcompra button[action=eliminarsi]': {
                click: this.eliminarsi
            },
             'facturascomprasprincipal button[action=eliminarcompras]': {
                click: this.eliminarcompras
            },
            'facturascomprasingresar #numfacturaId': {
                specialkey: this.special7,
                //blur: this.validanumfact              
            },
            'facturascomprasprincipal button[action=buscarcompras]': {
                click: this.buscarfacturasgrilla
            },

            
             });
    },

    buscarfacturasgrilla: function(){

        var view = this.getFacturascomprasprincipal();
        var st = this.getFacturaComprasStore();
        var opcion = view.down('#tipoSeleccionId').getValue();
        var documento = view.down('#tipoDocumentoId').getValue();
        var nombre = view.down('#nombreId').getValue();
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion,
                                documento: documento}
        st.load();


        
    },

    eliminaritem: function(){
        var view = this.getFacturascomprasingresar();
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

        var view = this.getFacturascomprasingresar();
        var bodega = view.down('#bodegaId').getValue();
        var grid  = view.down('#itemsgridId');
        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;
                       
            Ext.Ajax.request({
            url: preurl + 'productos/buscarp?nombre='+id_producto,
            params: {
                id: 1,
                bodega: bodega,
                nombre: id_producto
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

    special7: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validanumfact()
        };

        if (e.getKey() == e.TAB) {
           this.validanumfact()
        };
    },

    validanumfact: function(){

        var viedit = this.getFacturascomprasingresar();
        var numfactura = viedit.down('#numfacturaId').getValue();
        var idproveedor = viedit.down('#id_cliente').getValue();
        var SI = "SI";
        var NO = "NO";
        var CERO = "";
        if (!idproveedor){
            Ext.Msg.alert('Debe ingresar Rut');
            return;
        };

        if (!numfactura){
            Ext.Msg.alert('Debe ingresar Numero de Factura');
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



    eliminarcompras: function(){

        var view = this.getFacturascomprasprincipal()
       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit =   Ext.create('Infosys_web.view.compras.Eliminar').show();
            edit.down('#idclienteID').setValue(row.data.id);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
    },

    eliminarsi: function(){

        var view = this.getEliminarcompra();
        var viedit = this.getFacturascomprasprincipal();
        var idcliente = view.down('#idclienteID').getValue()
        var bodega = viedit.down('#bodegaId').getValue()
        var st = this.getFacturaComprasStore();
        Ext.Ajax.request({
            url: preurl + 'compras/elimina2',
            params: {

                idcliente: idcliente,
                bodega : bodega
                
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

    salircompra: function(){

       var view = this.getEliminarcompra()
       view.close();

    },

    agregarItem: function() {

        var view = this.getFacturascomprasingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;

         
        if (descuento == 1){            
            var descuento = 0;
            var iddescuento = 0;
        };

        if (descuento > 0){            
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
        };
        
        var neto = ((cantidad * precio) - descuento);
        var tot = ((cantidad * precio) - descuento);
        var tot = (parseInt(neto * 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var total = ((neto + iva ));

        
        if(!producto){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;
        }

        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }

        if(!precio){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }


        if(!cantidad){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }


        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }

        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
           
        }

        stItem.each(function(r){
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#descuentoId').setValue(cero);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            id_descuento: iddescuento,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva,
            dcto: descuento
        }));
        this.recalcularFinal();

        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#totdescuentoId').setValue(cero1);
        view.down('#DescuentoproId').setValue(cero);
        view.down("#buscarproc").focus();
    },

    exporttxt: function(){

         Ext.create('Infosys_web.view.ventas.Exportartxt').show();
                              
        //window.open(preurl + 'adminServicesExcel/exportarTXT');
       
    },

    exporttxtfechas : function(){

        var view =this.getFormularioexportartxt()
        var viewnew =this.getfacturascomprasprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
                
        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        window.open(preurl + 'adminServicesExcel/exportarTXT?cols='+'&fecha='+fecha+'&fecha2='+fecha2);
            view.close();
    },


    

    changedctofinal: function(){
        this.recalculardescuento();
    },


    recalculardescuento: function(){

        var view = this.getfacturascomprasingresar();
        var pretotal = view.down('#finalafectoId').getValue();
        var total = view.down('#finaltotalpostId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var descuento = view.down('#tipoDescuentoId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
       
        pretotalfinal = ((total * dcto)  / 100);
        total = ((total) - parseInt(pretotalfinal));
        afecto = (parseInt(total / 1.19));
        iva = (total - afecto);

        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
    },

    changedctofinal3: function(){
        this.recalculardescuentopro();
    },

    recalculardescuentopro: function(){
        var view = this.getFacturascomprasingresar();
        var precio = view.down('#precioId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var total = ((precio * cantidad));
        var desc = view.down('#DescuentoproId').getValue();
        if (desc){
        var descuento = view.down('#DescuentoproId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
        totaldescuento = (((total * dcto)  / 100));
        view.down('#totdescuentoId').setValue(totaldescuento);
        };         
    },

    condicionpago: function(){
        var viewIngresa = this.getFacturascomprasingresar();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var bolEnable = false;
        var bolDisabel = true;
         
        if (idpago == 1){
            viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
            viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
            viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);                
        };
        if (idpago == 6){
             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);            
        };
        if (idpago == 7){

             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
            
        };
        if (idpago == 2){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 3){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 4){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 5){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };        

    },

    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut2()
        }
    },

    validarut2: function(){

        var view = this.getObservacionesfacturasdirectas();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };

        Ext.Ajax.request({
            url: preurl + 'facturasvizualiza/validaRut?valida='+rut,
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

    ingresaobs: function(){

        var view = this.getObservacionesfacturasdirectas();
        var viewIngresar = this.getfacturascomprasingresar();                
        var rut = view.down('#rutmId').getValue();
        var nombre = view.down('#nombreId').getValue();
        var camion = view.down('#camionId').getValue();
        var fono = view.down('#fonoId').getValue();
        var carro = view.down('#carroId').getValue();
        var observa = view.down('#observaId').getValue();
        var valida = view.down('#validaId').getValue();
        var numero = view.down('#FactId').getValue();      
        
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
            url: preurl + 'facturasvizualiza/saveobserva',
            params: {
                rut: rut,
                nombre: nombre,
                camion: camion,
                carro : carro,
                fono : fono,
                observa : observa,
                numero: numero
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idobserva = resp.idobserva;         
                view.close();
                viewIngresar.down("#observaId").setValue(observa);
                viewIngresar.down("#permiteId").setValue(permite);
                viewIngresar.down("#obsId").setValue(idobserva);               

            }
           
        });
    },

    observaciones: function(){

        var viewIngresa = this.getFacturascomprasingresar();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.ventas.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#idfactura").setValue(numfactura);

    },

    exportarexcelfacturas: function(){              
           Ext.create('Infosys_web.view.compras.Exportar').show();
    },

    generarlibropdf: function(){
              
           Ext.create('Infosys_web.view.compras.Exportarpdf').show();
    },    

    exportarExcelFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getFacturascomprasprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getFormularioexportarcompras()
        var viewnew =this.getFacturascomprasprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
        var opcion = view.down('#tipoId').getSubmitValue();

        
        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        if (opcion == "LIBRO VENTAS"){

              window.open(preurl + 'adminServicesExcel/exportarExcellibroFacturascompras?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2);
            view.close();
            
            

        }else{

             window.open(preurl + 'adminServicesExcel/exportarExcelFacturascompras?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&opcion='+opcion+'&nombre='+nombre);
        view.close();

          

        }       
 
    },

    exportarPdfFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getFacturascomprasprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getFormularioexportarpdfcompras()
        var viewnew =this.getFacturascomprasprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
        var opcion = view.down('#tipoId').getSubmitValue();

        console.log(opcion)

        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        if (opcion == "LIBRO VENTAS"){

              window.open(preurl + 'compras/exportarPdflibroFacturas?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2);
            view.close();
            
            

        }else{

             window.open(preurl + 'facturas/exportarPdfFacturas?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&opcion='+opcion+'&nombre='+nombre);
        view.close();         

        }
       
 
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    selecttipocondpago: function() {
        
        var view =this.getFacturascomprasingresar();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;

        if (dias > 0){
        
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

        };
       
            
    },

    seleccionarsucursalcliente: function(){

        var view = this.getBuscarsucursalesclientescompras();
        var viewIngresa = this.getFacturascomprasingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            viewIngresa.down('#preciosId').setValue(row.data.id_lista);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscar: function(){

        var view = this.getBuscarproveedores()
        var st = this.getProveedoresStore()
        var nombre = view.down('#nombreId').getValue()
        var opcion = view.down('#tipoSeleccionId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    buscarsucursalfactura: function(){

       var busca = this.getFacturascomprasingresar()
       var nombre = busca.down('#id_cliente').getValue();
       if (nombre){
         var edit = Ext.create('Infosys_web.view.compras.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },

    seleccionarcliente: function(){

        var view = this.getBuscarproveedores();
        var viewIngresa = this.getFacturascomprasingresar();
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
            viewIngresa.down('#preciosId').setValue(row.data.id_lista);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            view.close();
            var condicion = viewIngresa.down('#tipocondpagoId');
            var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
            var stCombo = condicion.getStore();
            var record = stCombo.findRecord('id', condicion.getValue()).data;
            dias = record.dias;
            var bolEnable = false;
            if(row.data.id_pago == 1){
                viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);                
            };
            if(row.data.id_pago == 6){

                 viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                 viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                 viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                
            };
            if (row.data.id_pago == 7){

                 view.down('#DescuentoproId').setDisabled(bolEnable);
                 view.down('#tipoDescuentoId').setDisabled(bolEnable);
                 view.down('#descuentovalorId').setDisabled(bolEnable);
                
            };          
            

            if (dias > 0){
        
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
        };
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        this.validanumfact();
        viewIngresa.down("#codigoId").focus();
       
    },    

    generarfacturapdf: function(){
        var view = this.getfacturascomprasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            if (row.data.id_factura==0){
                if (row.data.forma==0){
                    window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id)
                }else{
                    window.open(preurl + 'facturaglosa/exportfacturaglosaPDF/?idfactura='+row.data.id);
                }
            }else{
                window.open(preurl +'facturas/exportlotePDF/?idfactura=' + row.data.id)
            }
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    generarfacturacediblepdf: function(){
        var view = this.getfacturascomprasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var tipo_documento = row.data.tipo_documento;

            if (tipo_documento==101 || tipo_documento==103){
                window.open(preurl +'facturas/exportFePDF/' + row.data.id+'/cedible')
            }else{
                Ext.Msg.alert('Alerta', 'Solo disponible para facturas electronicas');
            }
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },    

    
    grabarfactura: function() {

        var viewIngresa = this.getFacturascomprasingresar();
        var bolEnable = true;

        viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
        var tipo_documento = viewIngresa.down('#tipoDocumentoId');
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idtipo= viewIngresa.down('#tipoDocumentoId').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var idfactura = viewIngresa.down('#idfactura').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var observa = viewIngresa.down('#observaId').getValue();
        var idobserva = viewIngresa.down('#obsId').getValue();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var formadepago = viewIngresa.down('#tipocondpagoId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var valfactura = viewIngresa.down('#valfacturaId').getValue();
        var stItem = this.getProductosItemsStore();
        var stFactura = this.getFacturaComprasStore();



        if (valfactura=="NO"){

            if(vendedor==0  && tipo_documento.getValue() == 1){  
                var bolEnable = false;               
                viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
                Ext.Msg.alert('Ingrese Datos del Vendedor');
                return;   
            }

            if(vendedor==0  && tipo_documento.getValue() == 1){                 
                var bolEnable = false;               
                viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
                Ext.Msg.alert('Ingrese Datos del Vendedor');
                return;   
            }

            if(!numfactura){

                var bolEnable = false;               
                viewIngresa.down('#grabarfactura').setDisabled(bolEnable);             
                Ext.Msg.alert('Ingrese Numero de Factura');
                return;   
            }

            if(numfactura==0){
                var bolEnable = false;               
                viewIngresa.down('#grabarfactura').setDisabled(bolEnable);           
                Ext.Msg.alert('Ingrese Datos a La Factura');
                return;   
            }

            var dataItems = new Array();
            stItem.each(function(r){
                dataItems.push(r.data)
            });

                        
            Ext.Ajax.request({
                url: preurl + 'compras/save',
                params: {
                    idcliente: idcliente,
                    idfactura: idfactura,
                    idsucursal: idsucursal,
                    idcondventa: idcondventa,
                    idtipo:idtipo,
                    items: Ext.JSON.encode(dataItems),
                    observacion: observa,
                    idobserva: idobserva,
                    vendedor : vendedor,
                    numfactura : numfactura,
                    fechafactura : fechafactura,
                    fechavenc: fechavenc,
                    formadepago: formadepago,
                    tipodocumento : tipo_documento.getValue(),
                    netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                    ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                    afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                    descuentofactura : viewIngresa.down('#descuentovalorId').getValue(),
                    totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
                },
                 success: function(response){
                    var resp = Ext.JSON.decode(response.responseText);
                    var idfactura= resp.idfactura;
                     viewIngresa.close();
                     stFactura.load();
                     window.open(preurl + 'compras/exportPDF/?idfactura='+idfactura);

                }           
            });          

        }else{

            var numfactura = viewIngresa.down('#numfacturaId').getValue();
            var idproveedor = viewIngresa.down('#id_cliente').getValue();
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

                       if(vendedor==0  && tipo_documento.getValue() == 1){  
                            var bolEnable = false;               
                            viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
                            Ext.Msg.alert('Ingrese Datos del Vendedor');
                            return;   
                        }

                        if(vendedor==0  && tipo_documento.getValue() == 1){                 
                            var bolEnable = false;               
                            viewIngresa.down('#grabarfactura').setDisabled(bolEnable);
                            Ext.Msg.alert('Ingrese Datos del Vendedor');
                            return;   
                        }

                        if(!numfactura){

                            var bolEnable = false;               
                            viewIngresa.down('#grabarfactura').setDisabled(bolEnable);             
                            Ext.Msg.alert('Ingrese Numero de Factura');
                            return;   
                        }

                        if(numfactura==0){
                            var bolEnable = false;               
                            viewIngresa.down('#grabarfactura').setDisabled(bolEnable);           
                            Ext.Msg.alert('Ingrese Datos a La Factura');
                            return;   
                        }

                        var dataItems = new Array();
                        stItem.each(function(r){
                            dataItems.push(r.data)
                        });

                        
                    Ext.Ajax.request({
                        url: preurl + 'compras/save',
                        params: {
                            idcliente: idcliente,
                            idfactura: idfactura,
                            idsucursal: idsucursal,
                            idcondventa: idcondventa,
                            idtipo:idtipo,
                            items: Ext.JSON.encode(dataItems),
                            observacion: observa,
                            idobserva: idobserva,
                            vendedor : vendedor,
                            numfactura : numfactura,
                            fechafactura : fechafactura,
                            fechavenc: fechavenc,
                            formadepago: formadepago,
                            tipodocumento : tipo_documento.getValue(),
                            netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                            ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                            afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                            descuentofactura : viewIngresa.down('#descuentovalorId').getValue(),
                            totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
                        },
                         success: function(response){
                            var resp = Ext.JSON.decode(response.responseText);
                            var idfactura= resp.idfactura;
                             viewIngresa.close();
                             stFactura.load();
                             window.open(preurl + 'compras/exportPDF/?idfactura='+idfactura);

                        }           
                        });
                    }
            }
            });
        };
    },

    cerrarfactura: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    selectItemdocuemento: function() {
        
        var view =this.getFacturascomprasingresar();
        var nombre = view.down('#tipoDocumentoId').getValue();
        console.log(nombre);
        var cero="";
        
        if(nombre == 3){  // limpiar campos           
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();               
        }

        if(nombre == 4){  // limpiar campos
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();              
        }

        if(nombre == 5){
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();           
        }

        if(nombre == 1){
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();           
        }

        if(nombre == 2){           
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();
        }

        if(nombre == 6){           
           view.down("#id_cliente").setValue(cero)
           view.down("#nombre_id").setValue(cero)
           view.down("#tipoCiudadId").setValue(cero)
           view.down("#tipoComunaId").setValue(cero)
           view.down("#tipoVendedorId").setValue(cero)
           view.down("#giroId").setValue(cero)
           view.down("#preciosId").setValue(cero)
           view.down("#direccionId").setValue(cero)
           view.down("#tipocondpagoId").setValue(cero)
           view.down('#rutId').setValue(cero); 
           view.down('#tipoDocumentoId').setValue(nombre);  
           view.down("#numfacturaId").focus();
        }

       
    },

    recalcularFinal: function(){

        var view = this.getFacturascomprasingresar();
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.total
            iva = iva + r.data.iva
            neto = neto + r.data.neto
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - (pretotalfinal));
        afecto = neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
          
    },

    validaboleta: function(){

        var view =this.getFacturascomprasingresar();
        var rut = view.down('#rutId').getValue();
        
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
                        view.down("#preciosId").setValue(cliente.id_lista)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)
                        view.down("#rutId").setValue(rut)                       
                    }
                    
                }
            }

        }); 
        
        view.down('#numfacturaId').focus();      
       
    },

    validarut: function(){

        var view =this.getFacturascomprasingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;
        var nombre ="Nombre";

        if(numero==0){
            var edit = Ext.create('Infosys_web.view.compras.BuscarProveedores');
            edit.down("#nombreId").focus();
            edit.down("#tipoSeleccionId").setValue(nombre);
                             
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
                        view.down("#preciosId").setValue(cliente.id_lista)
                        view.down("#direccionId").setValue(cliente.direccion)    
                        view.down("#rutId").setValue(rut)
                        //view.down("#btnproductoId").focus()  
                                             
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

              
            }

        });       
        }
        //this.validanumfact();
        view.down("#codigoId").focus();
    },
    
    mfactura: function(){

         var viewIngresa = this.getFacturascomprasprincipal();
         var idbodega = viewIngresa.down('#bodegaId').getValue();
         var tipdoc="1";
         if(!idbodega){
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega');
            return;    
         }else{
            var view = Ext.create('Infosys_web.view.compras.Facturas').show()
             
         }
         view.down('#bodegaId').setValue(idbodega);
         view.down('#tipoDocumentoId').setValue(tipdoc);
         view.down('#numfacturaId').focus();
         //this.selectItemdocuemento();

     
    },

    mcompras: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'facturascomprasprincipal'});
        var viewIngresa = this.getFacturascomprasprincipal();
        var idbodega = "1";
        viewIngresa.down('#bodegaId').setValue(idbodega);

    },

    buscarvendedor: function(){
        Ext.create('Infosys_web.view.vendedores.BuscarVendedor').show();
    },

    buscarproductos: function(){
          
        var viewIngresa = this.getFacturascomprasingresar();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var codproducto = viewIngresa.down('#codigoId').getValue();

        if (codproducto){

            Ext.Ajax.request({
            url: preurl + 'productos/buscacodigo',
            params: {
                idBodega: idbodega,
                codigo: codproducto                 
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                var cliente = resp.cliente;
                viewIngresa.down("#productoId").setValue(cliente.id_producto)
                viewIngresa.down("#nombreproductoId").setValue(cliente.nombre)
                viewIngresa.down("#precioId").setValue(cliente.p_costo)
                viewIngresa.down("#cantidadOriginalId").setValue(cliente.stock)
                viewIngresa.down("#cantidadId").focus();
                }else{                      
                    var view = Ext.create('Infosys_web.view.productos.Ingresar').show();
                    view.down("#codigoId").setValue(codproducto);
                    view.down("#tipobodegaId").setValue(idbodega);                    
                    view.down("#nombreId").focus();
                }
            }
        });
        }else{        
            var st = this.getProductosEStore();
            st.proxy.extraParams = {opcion : idbodega};
            st.load();
            var edit = Ext.create('Infosys_web.view.compras.BuscarProductos').show();
            edit.down('#bodegaId').setValue(idbodega);
        };
      
    },

    seleccionarproductoscompras: function(){

        var view = this.getBuscarproductosfacturascompras();
        var viewIngresa = this.getFacturascomprasingresar();
        var bodegaId = viewIngresa.down('#bodegaId').getValue();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            if (row.data.id_bodega != bodegaId){

                Ext.Msg.alert('Alerta', 'Stock Seleccionado No Corresponde a Bodega Despacho');
                return;
                
            }else{
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            view.close();
            };
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        viewIngresa.down("#cantidadId").focus();
    },

    buscarp: function(){
        var view = this.getBuscarproductosfacturascompras();
        var st = this.getProductosEStore()
        var nombre = view.down('#nombreId').getValue()
        var bodega = view.down('#bodegaId').getValue()
        st.proxy.extraParams = {opcion : bodega,
                                tipo : "Nombre",
                                nombre: nombre}
        st.load();
    },

    buscarfact: function(){
        
        var view = this.getfacturascomprasprincipal();
        var st = this.getFacturaStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },
  
});










