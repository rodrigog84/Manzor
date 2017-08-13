Ext.define('Infosys_web.controller.Ventadirecta', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Venta',
             'Tipo_documento',
             'Cond_pago',
             'Preventa_detalle',
             'recaudacion.Items',
             'Factura5',
             'Productosf',
             'ProductosE',
             'Mecanicos',
             'Clientes',
             'Preventa',
             'Sucursales_clientes',
             'Boleta',
             'productos.Items'
             ],

    models: ['Venta.Item',
              'Cond_pag',
              'Preventa_detalle',
              'Recaudacion',
              'Recaudacion_detalle',
              'recaudacion.Item',
              'Factura',
              'Boletas',
              'Producto'],

    views: ['Pago_caja.Genera_pago',
            'Pago_caja.Principal',
            'Pago_caja.Facturas',
            'Pago_caja.Apertura',
            'Pago_caja.BuscarSucursales',
            'Preventa.BuscarProductos3',
            'Preventa.BuscarClientes3',
            'Preventa.Pagocheque',
            'Preventa.Observaciones'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'pagocajaprincipal',
        selector: 'pagocajaprincipal'
    },{    
        ref: 'generapagoingresar',
        selector: 'generapagoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'documentosingresar',
        selector: 'documentosingresar'
    },{    
        ref: 'aperturacaja',
        selector: 'aperturacaja'
    },{    
        ref: 'buscarsucursalesfactura',
        selector: 'buscarsucursalesfactura'
    },{    
        ref: 'observacionesfacturas',
        selector: 'observacionesfacturas'
    },{    
        ref: 'buscarclientesboleta2',
        selector: 'buscarclientesboleta2'    
    },{    
        ref: 'buscarproductospreventa3',
        selector: 'buscarproductospreventa3'
    },{    
        ref: 'generapagocheque',
        selector: 'generapagocheque'
    },{    
        ref: 'preventaprincipal',
        selector: 'preventaprincipal'
    },{    
        ref: 'observacionespvale',
        selector: 'observacionespvale'
    }




    ],
    
    init: function() {
    	
        this.control({

            'documentosingresar button[action=pagar]': {
                click: this.selectcondpago
            },
            'documentosingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'documentosingresar button[action=grabarboleta]': {
                click: this.grabarboleta
            },
            'documentosingresar #cantidadId': {
                specialkey: this.special8
            },
            'documentosingresar button[action=validarut]': {
                click: this.validarut
            },
            'documentosingresar #rutId': {
                specialkey: this.special6
            },
            'observacionespvale #rutId': {
                specialkey: this.special7
            },
            'documentosingresar #DescuentoproId': {
                change: this.changedctofinal3
            },
            'documentosingresar #tipoDocumento2Id': {
                select: this.selectItemdocuemento
            },
            'buscarclientesboleta2 button[action=buscar]': {
                click: this.buscar
            },
            'buscarclientesboleta2 button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'documentosingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductospreventa3 button[action=buscar]': {
                click: this.buscarp
            },
            'buscarproductospreventa3 button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'documentosingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'generapagocheque button[action=agregarrecaudacion]': {
                click: this.agregarrecaudacion
            },
            'generapagocheque button[action=aceptacheques]': {
                click: this.aceptacheques
            },
            'generapagocheque button[action=eliminaritem]': {
                click: this.eliminaritem2
            },
            'topmenus menuitem[action=mpagocaja]': {
                click: this.mpagocaja
            },
            'generapagocheque #condpagoId': {
                select: this.selectcondpago2
            },
            'generapagocheque #valorcancelaId': {
                specialkey: this.special,
                blur: this.selectItemcancela                    
            },
            'documentosingresar button[action=editaritem]': {
                click: this.editaritemvale
            },
            'generapagocheque button[action=salircheques]': {
                click: this.salircheques
            },
            'documentosingresar button[action=agregarobservacionesvale]': {
                click: this.agregarobserva
            },
            'observacionespvale button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'observacionespvale button[action=validar]': {
                click: this.validarut2
            },
        });
    },

    special7: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut2()
        }
    },

    validarut2: function(){

        var view = this.getObservacionespvale();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };

        Ext.Ajax.request({
            url: preurl + 'preventa/validaRut?valida='+rut,
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

        var view = this.getObservacionespvale();
        var viewIngresar = this.getDocumentosingresar();                
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
                viewIngresar.down("#permiteId").setValue(permite);
            }           
        });
    },

    agregarobserva: function(){

        var viewIngresa = this.getDocumentosingresar();
        var observa = viewIngresa.down('#observaId').getValue();
        var numpreventa = viewIngresa.down('#ticketId').getValue();
        if (!observa){
            var view = Ext.create('Infosys_web.view.Preventa.Observaciones').show();
            view.down("#rutId").focus();
            view.down("#preventaId").setValue(numpreventa);          

        }else{
            Ext.Ajax.request({
            url: preurl + 'preventa/getObserva',
            params: {
                idobserva: observa
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                console.log("llegamos")
                if (resp.success == true){                
                var observar = (resp.observar);
                var rut = (observar.rut);
                console.log(rut);
                var view = Ext.create('Infosys_web.view.Preventa.Observaciones').show();
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


    salircheques: function(){

        var view =this.getDocumentosingresar();
        var edit =this.getGenerapagocheque();
        var bolEnable = false;
        view.down('#pagoId').setDisabled(bolEnable);
        view.down('#grababoletaId').setDisabled(bolEnable);
        edit.close();
        

    },

    editaritemvale: function() {

        var view = this.getDocumentosingresar();
        var grid  = view.down('#itemsgridId');
        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;
            var codigo = row.data.codigo;      
            var precio = row.data.precio;
            var nombrepro = row.data.nombre;    
            var cantidad = row.data.cantidad;      
            var stock = row.data.stock;    
            var id_descuento = row.data.id_descuento;      
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
                        view.down('#precioId').setValue(precio);
                        view.down('#productoId').setValue(id_producto);
                        view.down('#nombreproductoId').setValue(nombrepro);
                        view.down('#codigoId').setValue(codigo);
                        view.down('#cantidadOriginalId').setValue(stock);
                        view.down('#cantidadId').setValue(cantidad);
                        view.down('#DescuentoproId').setValue(id_descuento);
                                                     
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




    eliminaritem2: function() {
        var view = this.getGenerapagocheque();
        var grid  = view.down('#recaudacionId');
        var valortotal = view.down('#valorpagoId').getValue();
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var valortotal = valortotal + row.data.valor_cancelado;
            view.down('#valorpagoId').setValue(valortotal);
            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }   
    },

    aceptacheques: function(){

        var view = this.getGenerapagocheque();
        var viewIngresa = this.getDocumentosingresar();
        var valida = "SI";
        var cero=0;
        var valortotal = view.down('#finaltotalId').getValue();
        if (valortotal == 0){
            viewIngresa.down('#permiteId').setValue(valida);    
            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
            return;
            
        }
        viewIngresa.down('#permiteId').setValue(valida);
        console.log(valida);
        
    },

    agregarrecaudacion: function() {

        var view = this.getGenerapagocheque();
        var viewIngresa = this.getDocumentosingresar();
        var stItem = this.getRecaudacionItemsStore();
        var formapago = view.down('#condpagoId');
        var stCombo = formapago.getStore();
        var record = stCombo.findRecord('id', formapago.getValue()).data;
        var numcheque = view.down('#numchequeId').getValue();
        var fechacheque = view.down('#fechacheqId').getValue();
        var fechatransac = viewIngresa.down('#fechaventaId').getValue();
        var valortotal = view.down('#finaltotalId').getValue(); 
        var valorpago = view.down('#finaltotalId').getValue();
        var valorcancela = view.down('#valorcancelaId').getValue();
        var documento = viewIngresa.down('#tipoDocumento2Id');
        var stCombo = documento.getStore();
        var iddocumento = stCombo.findRecord('id', documento.getValue()).data;
        var tipodoc  = iddocumento.id;
        var numdoc = viewIngresa.down('#numboleta2Id').getValue();
        var valorvuelto = view.down('#valorvueltoId').getValue();
        var contado = viewIngresa.down('#efectivonId').getValue();
        var cheques = viewIngresa.down('#totchequesnId').getValue();
        var otros = viewIngresa.down('#otrosmontosnId').getValue();
        var banco = view.down('#bancoId').getValue();
        var vali = "SI";

                
        if (!contado){
            
            var contado = 0;
        }

        if (!valorvuelto){
            
            var valorvuelto = 0;
        }

        if (!cheques){
            
            var cheques = 0;
        }

        if (!otros){
            
            var otros = 0;
        }

        
        var cero = 0;
        var valida = 1; 
        
        console.log(record.nombre);    
               

        if (record.nombre == "CONTADO") {
                   
            var valortotal = ((valorcancela))-((valorvuelto)) ;
            var valort = ((valorcancela))-((valorvuelto)) ;
            var contado = ((contado)) + ((valortotal));
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta al Contado";                    

        }

        if (record.nombre == "PAGO CHEQUE ") {

            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;          
            
            } 

            var valortotal = ((valorcancela));
            var valort = (valorcancela);
            var cheques = (cheques) + (valortotal); 
                       
            if (!numcheque){

             Ext.Msg.alert('Alerta', 'Ingrese Numero de Cheque');
             return; 
            };

        }

        if (record.nombre == "CREDITO") {

            
            var id_banco = "";
            var numcheque = 0;
            var valorvuelto = view.down('#valorvueltoId').getValue();
            var nombrebanco = "";
            var id_banco = "";
            var valortotal = (valorcancela);
            var valort = (valorcancela);
            var otros = (otros) + (valortotal);
            console.log(record.nombre);
            var nombrebanco = "Venta a Credito";     

        }

               
        if (record.nombre == "TRANSFERENCIA BANCARIA") {

            var otros = (otros) + (valortotal);
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var valortotal = (valorcancela);
            var valort = (valorcancela);                     

        }

        if (record.nombre == "TARJETA DEBITO") {

            
            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };

            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);         
            
            }                 

        }

        if (record.nombre == "TARJETA CREDITO") {

            var vali = "SI";
            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };
            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);        
            
            }
        }
        
               
        if (valortotal > valorpago ) {

            Ext.Msg.alert('Alerta', 'Valor Mayor a lo  Cancelado');
             return;
        }      
        
        
        if (!valorcancela){

             Ext.Msg.alert('Alerta', 'Ingrese Monto a Cancelar');
             return; 
        }


        if (!numdoc){

             Ext.Msg.alert('Alerta', 'Agregar Numero de Boleta');
             return; 
        };

        var exists = 0;        
        stItem.each(function(r){
            if (r.data.nom_forma == "PAGO CHEQUE "){
            if(r.data.id_record == record.id & r.data.num_cheque == numcheque ){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                return; 
            }
            }           
        });

        if(exists == 1)
            return;

        stItem.add(new Infosys_web.model.recaudacion.Item({
            id_pago: record.id,
            detalle: nombrebanco,
            nom_forma: record.nombre,
            num_doc : numdoc,            
            id_num_doc : iddocumento.id, 
            id_forma: record.id,
            num_cheque: numcheque,
            fecha_comp: fechacheque,
            fecha_transac: fechatransac,            
            nom_banco: nombrebanco,
            id_banco: id_banco,
            valor_pago: valorpago,
            valor_cancelado: valorcancela,
            valor_vuelto: valorvuelto
        }));

        var valortotal = view.down('#finaltotalId').getValue();
        var valortotal = valortotal + (valorcancela - valorvuelto);
        if (valorcancela<valorpago){            
            var valorsaldo = valorpago - valorcancela;
            view.down('#finaltotalId').setValue(valorsaldo);
        }else{

            view.down('#finaltotalId').setValue(cero);
                       
        };


        viewIngresa.down('#efectivonId').setValue(contado);
        viewIngresa.down('#totchequesnId').setValue(cheques);
        viewIngresa.down('#otrosmontosnId').setValue(otros);
        view.down('#valorcancelaId').setValue(cero);
        if  (tipodoc == 2 && record.id == 7){
            view.down('#numboleta2Id').setValue(numcheque);
            view.down('#fpagoId').setValue(record.id);
        }; 
        if (tipodoc == 2 && record.id == 4){
            view.down('#numboleta2Id').setValue(numcheque);
            view.down('#fpagoId').setValue(record.id);           
        };      
        
    },
   
    selectItemdocuemento: function() {
        
        var view =this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumento2Id');
        var tipo = tipo_documento.getValue();
        var cero="";
        var nombre="19";
        
        if(tipo == 101){  // limpiar campos
            view.down('#rutId').setValue(cero);
            view.down('#id_cliente').setValue(cero);
            view.down('#nombre_id').setValue(cero);
            view.down('#tipocondpagoId').setValue(cero);
            view.down('#direccionId').setValue(cero);
            view.down('#giroId').setValue(cero);  
            view.down('#tipoVendedorId').setValue(cero);
            view.down("#rutId").focus();         
                
        };

        if(tipo == 105){  // limpiar campos
            view.down('#rutId').setValue(cero);
            view.down('#id_cliente').setValue(cero);
            view.down('#nombre_id').setValue(cero);
            view.down('#tipocondpagoId').setValue(cero);
            view.down('#direccionId').setValue(cero);
            view.down('#giroId').setValue(cero);  
            view.down('#tipoVendedorId').setValue(cero);           
            view.down("#codigoId").focus();     
        };

        if(tipo == 2){  // limpiar campos
            Ext.Ajax.request({
                url: preurl + 'correlativos/buscaboletarut?valida='+nombre,
                params: {
                    id: 1
                },
                success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var detalle = resp.detalle;
                if (resp.success == true) {
                    view.down('#rutId').setValue(detalle.rut);
                    view.down('#id_cliente').setValue(detalle.id);
                    view.down('#nombre_id').setValue(detalle.nombres);
                    view.down('#tipocondpagoId').setValue(detalle.id_pago);
                    view.down('#direccionId').setValue(detalle.direccion);
                    view.down('#giroId').setValue(detalle.id_giro);  
                    view.down('#tipoVendedorId').setValue(detalle.id_vendedor);           
                    view.down("#codigoId").focus(); 

                 }
                 }            
                });  
                    
        };         
       
        view.down("#rutId").focus();       

     },

    agregarpedidocaja: function(){

         var viewIngresa = this.getPagocajaprincipal();
         var idbodega = "1";
         var dos = "2";
         var rut = "19";
         var idCliente = 1;
         var pedido = "3";
         var pago = "1";
         if(!idbodega){
            Ext.Msg.alert('Alerta', 'Debe Elegir Bodega');
            return;    
         }else{
         var nombre = "20";    
         Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.pedidos_caja.Pedidos').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#ticketId").setValue(correlanue);
                    view.down("#bodegaId").setValue(idbodega);
                    view.down("#tipoDocumentoId").setValue(dos);
                    view.down("#rutId").setValue(rut);
                    view.down("#id_cliente").setValue(idCliente);
                    view.down("#tipoPedidoId").setValue(pedido);
                    view.down("#tipocondpagoId").setValue(pago);
                    view.down("#nombre_id").focus();
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }
            }            
        });
        
        };        
       
    },

    special8: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.agregarItem()
        }
    },


    specialBoleta: function(f,e){    
       this.buscarproductos();
    },

    

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){

        var view = this.getDocumentosingresar();
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        
        stItem.each(function(r){
            pretotal = pretotal + ((r.data.total))
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
         
    },

    agregarItem3: function() {

        var view = this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var numdoc = view.down('#numboletaId').getValue();
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        var tipopago = 1;
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;

        var tot = ((cantidad * precio) - descuento);
        var neto = (Math.round(tot * 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = (neto + iva );
        
        stItem.each(function(r){
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                uno=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(uno);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            id_descuento: iddescuento,
            id_bodega: idbodega,
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
        view.down('#condpagoId').setValue(tipopago);
        view.down('#numboleta2Id').setValue(numdoc);
        view.down("#codigoId").focus();
    },

    

    agregarItem: function() {

        var view = this.getDocumentosingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var numdoc = 0;
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        if(!idbodega){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Bodega');
            return false;
        }
        var tipopago = 1;
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;

        if(!cantidad){            
            Ext.Msg.alert('Alerta', 'Debe Agregar Cantidad');
            return false;
        }
        
        var tot = ((cantidad * precio)- descuento);
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

        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
           
        }

        stItem.each(function(r){
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                uno=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(uno);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            id_descuento: iddescuento,
            id_bodega: idbodega,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva,
            dcto: descuento,
            stock: cantidadori
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
        //view.down('#condpagoId').setValue(tipopago);
        view.down("#codigoId").focus();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductospreventa3();
        var viewIngresa = this.getDocumentosingresar();
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
            viewIngresa.down("#cantidadId").focus();
            view.close();
            };
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        //this.buscarproductos();
       
    },

    buscarbarra: function(){

        var viewIngresa = this.getDocumentosingresar();
        var codigo = viewIngresa.down('#codigoId').getValue()
        var rut = viewIngresa.down('#rutId').getValue();
        var valida = "";
        if(!rut){
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Cliente');
            return;  
            
        }
        if(codigo){        
        var lista = 1;
        var idbodega = 1;
                  
        Ext.Ajax.request({
        url: preurl + 'productosfact/buscacodigoboleta',
        params: {
            id: 1,
            codigo : codigo,
            idlista : lista
        },
        success: function(response){
            var resp = Ext.JSON.decode(response.responseText);
            var cero = "";
            if (resp.success == true){                    
                if(resp.cliente){
                var cliente = resp.cliente;                        
                viewIngresa.down('#productoId').setValue(cliente.id_producto);
                viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                viewIngresa.down("#cantidadId").focus();                                             
                }                    
            };              
                                      
            if(resp.success == false){                
              if (resp.cliente){
                    var cliente = resp.cliente;                        
                    viewIngresa.down('#productoId').setValue(cliente.id_producto);
                    viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                    viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                    viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                    viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                    viewIngresa.down("#cantidadId").setValue(cliente.cantidad);
                    viewIngresa.down("#agregarId").focus();
                    //this.agregarItem();

              }else{
                   Ext.Msg.alert('Alerta', 'Producto no existe');
                    return;
            };          
          };
          }
        });
        };

        //this.agregarItem3();

    },

    buscarproductos: function(){

        var busca = this.getDocumentosingresar()
        var idbodega = busca.down('#bodegaId').getValue();
        var st = this.getProductosEStore();
        st.proxy.extraParams = {opcion : idbodega};
        st.load();
        var edit = Ext.create('Infosys_web.view.Preventa.BuscarProductos3').show();
        edit.down('#bodegaId').setValue(idbodega);
        
    },

    buscarp: function(){
        var view = this.getBuscarproductospreventa3();
        var st = this.getProductosEStore()
        var nombre = view.down('#nombreId').getValue()
        var bodega = view.down('#bodegaId').getValue()
        st.proxy.extraParams = {opcion : bodega,
                                tipo : "Nombre",
                                nombre: nombre}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientesboleta2();
        var viewIngresa = this.getDocumentosingresar();
        var viewedit = this.getPagocajaprincipal();
        var idcaja = 1;
        var idcajero = 1;        
        var lista = 1;
        var bodega = 1;
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#giroId').setValue(row.data.id_giro);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);          
            view.close();
            viewIngresa.down("#codigoId").focus();   
       
                 
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },    


    buscar: function(){

        var view = this.getBuscarclientesboleta2()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue();
        var rut = view.down('#rutId').getValue();
        if(nombre){
            var opcion="Nombre";
        };
        if(rut){
            var opcion="Rut";
            var nombre=rut;
        };
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    changedctofinal3: function(){
        this.recalculardescuentopro();
    },

    recalculardescuentopro: function(){

        var view = this.getDocumentosingresar();
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

   
   validarut: function(){

        var viewedit = this.getPagocajaprincipal();
        var view = this.getDocumentosingresar();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        var lista = 1;
        var idbodega = 1;
        var idcajero = 1;
        var idcaja = 1;
        
        if (!rut){
            
           var edit = Ext.create('Infosys_web.view.Preventa.BuscarClientes3');            
           
        };

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {                    
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#rutId").setValue(rut);
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.id_giro)
                        view.down("#direccionId").setValue(cliente.direccion)    
                        view.down("#rutId").setValue(rut)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)                        
                        //view.down("#buscarproc").focus()  
            
                    }else{
                        if (rut != ""){
                        var edit = Ext.create('Infosys_web.view.clientes.Ingresar').show();
                        edit.down("#rutId").setValue(rut)                        
                        edit.down("#nombre_id").focus() 
                        };
                    }
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      return false
                }

                //view.close()
            }

        });
        
        view.down("#codigoId").focus();   

    },


    observaciones: function(){

        var viewIngresa = this.getFacturasvizualizar();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.Pago_caja.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#FactId").setValue(numfactura);

    },

    special5: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.generaticket()
        }
    },  

    
    aperturacaja: function(){

         var view = this.getAperturacaja();
         var cajero = view.down('#cajeroId').getValue();
         var caja = view.down('#cajaId').getValue();
         var fecha = view.down('#fechaaperturaId').getValue();
       
         if (cajero){

            Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    
                }else{

                     view.down("#efectuvoId").focus();
                }
            }
           
            });            
        };

    },

   
    buscarsucursalfactura: function(){

       var busca = this.getFacturasvizualizar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.Pago_caja.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },
    
    eliminaritem: function() {
        var view = this.getDocumentosingresar();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
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
        };
        view.down("#codigoId").focus();

    },

    grabarboleta: function() {

        var viewIngresa = this.getDocumentosingresar();
        var bolEnable = true;
        viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var numerovale = viewIngresa.down('#numvaleId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var sucursal = viewIngresa.down('#id_sucursalID').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var vender = viewIngresa.down('#tipoVendedorId').getValue();
        var mecanicos = viewIngresa.down('#mecanicosId').getValue();
        var valida2 = viewIngresa.down('#permiteId').getValue();
        var otrabajo = viewIngresa.down('#otrabajoId').getValue();      
        var rtItem = this.getRecaudacionItemsStore();                
        if(!vender){
            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
            Ext.Msg.alert('Seleccione Vendedor');
            return;   
        }
        var idgiro = viewIngresa.down('#giroId').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var producto = viewIngresa.down('#tipoVendedorId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;        
        var vendedor = record.id;
        var fechapreventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getProductosItemsStore();
        var stPreventa = this.getPreventaStore();
        var observa = viewIngresa.down('#observaId').getValue();
        var idbodega = viewIngresa.down('#bodegaId').getValue();
        var recauda =  viewIngresa.down('#recaudaId').getValue();
        var numdoc = viewIngresa.down('#ticketId').getValue();
        var viewedit = this.getPreventaprincipal();
        var recauda =  viewedit.down('#recaudaId').getValue();
        var idcajero = viewedit.down('#cajeroId').getValue();
        var idcaja = viewedit.down('#cajaId').getValue();
        var contado =  viewIngresa.down('#efectivonId').getValue();
        var cheques =  viewIngresa.down('#totchequesnId').getValue();
        var otros =  viewIngresa.down('#otrosmontosnId').getValue();       
        var totaldocumento = viewIngresa.down('#finaltotalpostId').getValue();
        var tdocumento = (viewIngresa.down('#finaltotalpostId').getValue());        
        var finalafectoId = (totaldocumento / 1.19);
        var bodega = viewIngresa.down('#bodegaId').getValue();
       
        if(valida2=="NO"){
            var bolEnable = false;
            viewIngresa.down('#grababoletaId').setDisabled(bolEnable);
             Ext.Msg.alert('Informacion', 'Debe Cancelar Venta');
             return;            
        };


        if(!finalafectoId){
            Ext.Msg.alert('Ingrese Productos a la Venta');
            return;   
        }
      

        if(!idpago){
            Ext.Msg.alert('Ingrese Condicion Venta');
            return;   
        }        
       
       

        var dataItems2 = new Array();
        stItem.each(function(r){
            dataItems2.push(r.data)
        });

                      
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        var recItems = new Array();
        rtItem.each(function(r){
            recItems.push(r.data)
        });

        console.log(idcliente);

        Ext.Ajax.request({
            url: preurl + 'recaudacion/save',
            params: {
                fecha : Ext.Date.format(fechapreventa,'Y-m-d'),
                fechapago : Ext.Date.format(fechapreventa,'Y-m-d'),
                numboleta: numeroticket,
                numeroticket: numerovale,
                tipdocumento: idtipo, 
                vendedor: vender,
                recitems: Ext.JSON.encode(recItems),
                items: Ext.JSON.encode(dataItems),   
                items2: Ext.JSON.encode(dataItems2),                
                id_cliente : idcliente,
                id_caja : idcaja,
                id_cajero : idcajero,
                id_mecanicos: mecanicos,
                totaldocumento: totaldocumento,
                tdocumento: tdocumento,
                bodega: bodega,
                observa: observa,
                idtipo : idtipo,
                idrecauda: recauda,
                contado: contado,
                cheques: cheques,
                otros: otros,
                idmecanicos : mecanicos,
                idpago : idpago,
                idgiro : idgiro,
                otrabajo: otrabajo,
                idbodega : idbodega,
                numeroticket : numerovale,
                fechapreventa : fechapreventa,
                descuento : viewIngresa.down('#totdescuentoId').getValue(),
                neto : finalafectoId,
                iva : (totaldocumento - finalafectoId),
                afecto: finalafectoId,
                total: totaldocumento
                
                
            },

            success: function(response){
                var text = response.responseText;
                var resp = Ext.JSON.decode(response.responseText);
                var idboleta= resp.idboleta;
                var idpreventa= resp.idpreventa;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                viewedit.down('#efectivonId').setValue(contado);
                viewedit.down('#efectivoId').setValue(Ext.util.Format.number(contado, '0,00'));        
                viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
                viewedit.down('#totchequesnId').setValue(cheques);
                viewedit.down('#otrosmontosnId').setValue(otros);
                viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
                viewIngresa.close();
                stPreventa.load();
                window.open(preurl + 'preventa/exportPDF/?idpreventa='+idpreventa);
                window.open(preurl +'facturas/exportPDF/?idfactura=' + idboleta)
                

            }
        });
    },
  

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.selectItemcancela()
        }
    },

    selectItemcancela : function() {
        
        var view =this.getGenerapagocheque();
        var valorapagar = parseInt(view.down('#finaltotalId').getValue());
        var valorpagado = parseInt(view.down('#valorcancelaId').getValue());
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

       
        if (valida == "CONTADO") {

        if (valorapagar<valorpagado){
            calculo = (parseInt(valorpagado))-(parseInt(valorapagar));
            view.down('#valorvueltoId').setValue(calculo);
        }

        if (valorapagar==valorpagado){
            calculo = 0;
            view.down('#valorvueltoId').setValue(calculo);
        };

        }

        if (valida == "CREDITO") {

            calculo = 0;
            view.down('#valorvueltoId').setValue(calculo);
            view.down('#valorcancelaId').setValue(valorapagar);
        }

        
    },

    selectItemcaja : function() {
        
        var view = this.getPagocajaprincipal();
        var tipo_caja = view.down('#cajaId').getValue();
        var stCombo = tipo_caja.getStore();
        var record = stCombo.findRecord('id', tipo_caja.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#comprobanteId').setValue(correlanue);
        this.selectItemdocuemento();        
    },

    exportarexcelpagocaja: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPagocajaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPagocaja?cols='+Ext.JSON.encode(jsonCol));
 
    },

     salir : function() {
        var view =this.getFacturasvizualizar();
        view.close()
     },

    selectcondpago2: function() {
      
        var view =this.getGenerapagocheque();
        var condpago = view.down('#condpagoId');
        var totdocu = view.down('#finaltotalId').getValue();
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;


        var bolDisabled = valida == "CONTADO" ? true : false; // campos se habilitan sólo en factura
        
        view.down('#numchequeId').setDisabled(bolDisabled);
        view.down('#bancoId').setDisabled(bolDisabled);        

        if (valida == "PAGO CHEQUE "){
            view.down("#numchequeId").focus();
        };
               
        if (valida == "CONTADO"){

           view.down('#valorvueltoId').setDisabled(false);
           var nombrebanco = "";
           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);
           view.down("#valorcancelaId").focus();  
        
        };

        if (valida == "TARJETA CREDITO"){

            var corre = 20;

            Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+corre,
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
                    view.down("#numchequeId").setValue(correlanue);
                    view.down('#valorvueltoId').setDisabled(true);
                    view.down("#valorcancelaId").setValue(totdocu);
                    view.down("#numchequeId").focus();                   
                }

            }            
            });          
        
        };

        if (valida == "TARJETA DEBITO"){
            
            var corre = 20;

            Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+corre,
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
                    view.down("#numchequeId").setValue(correlanue);
                    view.down('#valorvueltoId').setDisabled(true);
                    view.down("#valorcancelaId").setValue(totdocu);
                    view.down("#numchequeId").focus();
                    
                }

            }            
            });
        
        };

        if (valida == "CREDITO 30 DIAS"){

           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);           
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
        
        };

        if (valida == "CREDITO 60 DIAS"){

           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);            
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
                
        };

    },

     
    selectcondpago: function() {
      
        var view =this.getDocumentosingresar();
        var bolEnable = true;
        view.down('#pagoId').setDisabled(bolEnable);
        view.down('#grababoletaId').setDisabled(bolEnable);
        var totdocu = view.down('#finaltotalpostId').getValue();
        var totdoc = view.down('#finaltotalId').getValue();
        var numdocu = view.down('#numboleta2Id').getValue();        
        if(!totdocu){

            var bolEnable = false;
            view.down('#pagoId').setDisabled(bolEnable);
            view.down('#grababoletaId').setDisabled(bolEnable);       
               
            Ext.Msg.alert('Debe Agregar Valores');
            return;                
        }else{
            var viewIngresa = Ext.create('Infosys_web.view.Preventa.Pagocheque').show();
            viewIngresa.down('#finaltotalId').setValue(totdocu);
            viewIngresa.down('#numboleta2Id').setValue(numdocu);
        };
    },
    
    mpagocaja: function(){
       
        var cajero = "1";
        var caja = "1";
        var fecha = 0;
                
        Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var view = Ext.create('Infosys_web.view.Pago_caja.Apertura').show();
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    view.down('#cajaId').setValue(caja.id_caja);
                    view.down('#cajeroId').setValue(caja.id_cajero);
                    view.down('#efectuvoId').focus();                 
                    
                }else{

                 var caja1 = "1";
                 var cajero1 = "1";

                 view.down('#efectuvoId').focus();
                 view.down('#cajaId').setValue(caja1);   
                 view.down('#cajeroId').setValue(cajero1);   
                }
            }
           
        });

    },

    
    generarpago: function(){

            var viewedit = this.getPagocajaprincipal();
            var recauda = viewedit.down('#recaudaId').getValue();
            var idcaja = viewedit.down('#cajaId').getValue();
            var nomcaja = viewedit.down('#nomcajaId').getValue();
            var contado = viewedit.down('#efectivonId').getValue();
            var cheques = viewedit.down('#totchequesnId').getValue();
            var otros = viewedit.down('#otrosmontosnId').getValue();
            var idcajero = viewedit.down('#cajeroId').getValue();
            var nomcajero = viewedit.down('#nomcajeroId').getValue();     

            var view = Ext.create('Infosys_web.view.Pago_caja.Facturas').show();                   
            var nombre = "2";
            var tipdocumento = "2";
            var rut = "19";
            var nombrec = "Clientes Varios";
            var lista = 1;
            var idbodega = 1;
            var id = 1;
            view.down("#codigoId").focus();

            Ext.Ajax.request({

            url: preurl + 'correlativos/generabol?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    view.down("#numboletaId").setValue(correlanue);  
                    view.down("#nomdocumentoId").setValue(cliente.nombre); 
                    view.down("#tipodocumentoId").setValue(tipdocumento);
                    view.down("#recaudaId").setValue(recauda);
                    view.down("#id_cliente").setValue(id)
                    view.down("#rutId").setValue(rut);
                    view.down("#nombre_id").setValue(nombrec);
                    view.down('#bodegaId').setValue(idbodega)
                    view.down('#listaId').setValue(lista)
                    view.down('#cajeroId').setValue(idcajero)
                    view.down('#cajaId').setValue(idcaja)                           
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }

            }            
                }); 
            //this.validarut();
            view.down("#codigoId").focus();          
    },

    cerrarcajaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










