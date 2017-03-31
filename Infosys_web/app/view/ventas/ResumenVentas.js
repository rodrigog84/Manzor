Ext.define('Infosys_web.view.ventas.ResumenVentas' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.resumenventas',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],
    title : 'Reporte Mensual de Ventas',
    autoHeight: false,

    autoShow: true,
    width: 700,
    height: 200,

    initComponent: function() {
        me = this;
         var meses = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'01', "nombre":"Enero"},
                {"value":'02', "nombre":"Febrero"},
                {"value":'03', "nombre":"Marzo"},
                {"value":'04', "nombre":"Abril"},
                {"value":'05', "nombre":"Mayo"},
                {"value":'06', "nombre":"Junio"},
                {"value":'07', "nombre":"Julio"},
                {"value":'08', "nombre":"Agosto"},
                {"value":'09', "nombre":"Septiembre"},
                {"value":'10', "nombre":"Octubre"},
                {"value":'11', "nombre":"Noviembre"},
                {"value":'12', "nombre":"Diciembre"}
            ]
        });


         var annos = Ext.create('Ext.data.Store', {
            fields: ['anno'],
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/get_annos',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        }); 


         var ventasMensuales = Ext.create('Ext.data.Store', {
            fields: ['concepto', 'Facturacion' , 'Boletas', 'NCredito' , 'totales'],
            data : [
                {"concepto":'<b>Neto Productos</b>', "Facturacion":"0" , "Boletas":"0" , "NCredito":"0" , "totales":"0"},
                {"concepto":'<b>Neto Afecto</b>', "Facturacion":"0" , "Boletas":"0" , "NCredito":"0" , "totales":"0"},
                {"concepto":'<b>Neto Exento</b>', "Facturacion":"0" , "Boletas":"0" , "NCredito":"0" , "totales":"0"},
                {"concepto":'<b>Impuesto IVA</b>', "Facturacion":"0" , "Boletas":"0" , "NCredito":"0" , "totales":"0"},
                {"concepto":'<b>Totales</b>', "Facturacion":"0" , "Boletas":"0" , "NCredito":"0" , "totales":"0"},
            ]
        });
     

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: true,
                style: 'background-color: #fff;',
                items: [
                  {
                            xtype: 'combobox',
                            width: 500,
                            store : meses,
                            fieldLabel: 'Mes',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'mes' ,
                            name : 'mes' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'nombre',
                            valueField : 'value'                            

                    },{
                            xtype: 'combobox',
                            width: 500,
                            store : annos,
                            fieldLabel: 'A&ntilde;o',
                            labelStyle: ' font-weight:bold',
                            labelWidth: 200,
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'anno' ,
                            name : 'anno' ,
                            forceSelection: true, 
                            allowBlank : false,
                            displayField : 'anno',
                            valueField : 'anno'                            

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-sheet',
                            text: 'Generar Reporte Mensual',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/reporte_mensual_ventas',
                                        //standardSubmit: true,//true, <---------
                                        waitMsg: 'Generando Reporte Ventas...',
                                        success: function(fp, o) {
                                        	//me.down('#itemsgridId').store.reload();
                                            console.log(fp)
                                            console.log(o)
                                            Ext.Msg.alert('Atención', o.result.message);
                                            ventasMensuales.clear();


                                            /*if(o.result.valido){
                                                // muestra archivo generado
                                                window.open(gbl_site + 'core/facturacion_electronica/libros/' + o.result.nombre_archivo,'_blank');
                                            }*/
                                            // borra archivo generado
                                            /*Ext.Ajax.request({
                                            async: false,
                                            url: preurl + 'facturas/unlink_fe/tmp/'+o.result.nombre_archivo});*/

                                        }
                                    }); 
                                }
                            }                            
                        }]
                    },
                    ]

            },{
                xtype: 'form',
                padding: '5 5 0 5',
                border: true,
                frame: false,
                style: 'background-color: #fff;',
                items: [
                {

                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle Resumen de Ventas Mensuales',
                            store : ventasMensuales,
                            labelWidth: 50,
                            height: 210,
                            columns: [
                                { text: 'Conceptos',  dataIndex: 'concepto', flex: 1},
                                { text: 'Facturaci&oacute;n',  dataIndex: 'Facturacion', flex: 1  },
                                { text: 'Boletas',  dataIndex: 'Boletas', flex: 1, align: 'left'},
                                { text: 'N/Cr&eacute;dito',  dataIndex: 'NCredito', flex: 1 },
                                { text: 'Totales',  dataIndex: 'totales', flex: 1},
                                ]

                }    
                ]    
               }    
        ];
        
        this.callParent(arguments);
    }
});
