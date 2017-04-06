Ext.define('Infosys_web.view.ventas.VerDetalleProductoStock' ,{
    extend: 'Ext.window.Window',
   // extend: 'Ext.form.Panel',
    alias : 'widget.verdetalleproductostock',
    
    requires: ['Ext.form.Panel','Ext.toolbar.Paging'],

    title : 'Detalle Producto',
    autoHeight: false,

    autoShow: true,
    width: 1200,
    height: 480,



    /*title : 'Detalle Producto',
    layout: 'fit',
    autoShow: true,
    width: 1200,
    height: 450,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,*/
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

        /* var f = new Date();
         var mes_actual = f.getMonth() + 1;
         if(mes_actual < 10){
            mes_actual = "0" + mes_actual;
         }
         
         var anno_actual = f.getFullYear();*/

         var mes_actual = 0;
         var anno_actual = 0;


        var stockProductos = Ext.create('Ext.data.Store', {
            fields: ['id','num','codigo', 'descripcion' , 'fecha_ult_compra', 'p_costo' , 'p_venta' , 'stock1', 'stock2', 'stock3', 'stock4'],
            pageSize: 8,
            autoLoad: true,
            proxy: {
              type: 'ajax',
                url : preurl +'reportes/reporte_stock',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
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
                            valueField : 'value',
                            //value : mes_actual                           

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
                            valueField : 'anno',
                           // value : 2016                            

                    },{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-sheet',
                            text: 'Generar Reporte Stock',
                            handler: function() {
                                var id_familia = me.down('#familia').getValue() == 'Seleccionar' ? '' : me.down('#familia').getValue();
                                var id_subfamilia = me.down('#subfamilia').getValue() == 'Seleccionar' ? '' : me.down('#subfamilia').getValue();
                                var id_agrupacion = me.down('#agrupacion').getValue() == 'Seleccionar' ? '' : me.down('#agrupacion').getValue();
                                var id_marca = me.down('#marca').getValue() == 'Seleccionar' ? '' : me.down('#marca').getValue();
                                stockProductos.proxy.extraParams = {familia : id_familia,
                                                                    subfamilia : id_subfamilia,
                                                                    agrupacion : id_agrupacion,
                                                                    marca : id_marca}
                                stockProductos.load();
                            }                            
                        },{
                            xtype: 'button',
                            iconCls : 'icon-pdf',
                            text: 'Exportar PDF',
                            handler: function() {
                                    window.open(preurl +'adminServicesPdf/reporte_stock/' + id_familia + '/' + id_subfamilia + '/' + id_agrupacion + '/' + id_marca)    
                            } 


                        },{                
                            xtype: 'button',
                            iconCls : 'icon-exel',
                            text: 'Exportar EXCEL',
                            handler: function() {
                                    window.open(preurl +'adminServicesExcel/reporte_stock/' + id_familia + '/' + id_subfamilia + '/' + id_agrupacion + '/' + id_marca)    
                                

                            }
                        },{
                            xtype: 'button',
                            iconCls: 'icon-delete',
                            action: 'cerrarfactura',
                            text : 'Cerrar'
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
                            store : stockProductos,
                            labelWidth: 50,
                            title: 'Detalle Productos',
                            height: 280,
                            columns: [
                                { text: 'id',  dataIndex: 'id', hidden: true, flex: 1},
                                { text: '#',  dataIndex: 'num', flex: 1},
                                { text: 'C&oacute;digo',  dataIndex: 'codigo', flex: 1},
                                { text: 'Descripci&oacute;n',  dataIndex: 'descripcion', flex: 1  },
                                { text: 'Fecha &Uacute;ltima Compra',  dataIndex: 'fecha_ult_compra', flex: 1, align: 'left'},
                                { text: 'Precio Costo',  dataIndex: 'p_costo', flex: 1 },
                                { text: 'Precio Venta',  dataIndex: 'p_venta', flex: 1 },
                                { text: 'Stock 1',  dataIndex: 'stock1', flex: 1},
                                { text: 'Stock 2',  dataIndex: 'stock2', flex: 1},
                                { text: 'Stock 3',  dataIndex: 'stock3', flex: 1},
                                { text: 'Stock 4',  dataIndex: 'stock4', flex: 1},
                                {
                                    header: "Detalle",
                                    xtype:'actioncolumn',
                                    width:80,
                                    align: 'center',
                                    items: [{
                                        icon: 'images/search_page.png',  // Use a URL in the icon config
                                        tooltip: 'Ver Detalle Producto',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            console.log(rec);
                                            //salert("Edit " + rec.get('firstname'));
                                            var vista = this.up('informestock');
                                            vista.fireEvent('verDetalleProductoStock',rec)
                                        }
                                    }]
                                    }
                                ]

                }    
                ]    
               },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: stockProductos,
            displayInfo: true
        }               



        ];
        
        this.callParent(arguments);
    }
});
