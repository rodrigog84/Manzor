Ext.define('Infosys_web.view.vale_despacho.Vale_despacho', {
    extend: 'Ext.window.Window',
    alias : 'widget.valedespachoingresar',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Number',
        'Ext.toolbar.Separator'
    ],

    autoShow: true,
    height: 630,
    width: 1350,
    layout: 'fit',
    title: 'Vale Despacho',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('preventa.Items');
        stItms.removeAll();
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    margin: 8,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 140,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 35,
                                    labelWidth: 120,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 200,
                                            allowBlank: false,
                                            name: 'num_ticket',
                                            itemId: 'ticketId',
                                            fieldLabel: '<b>NUMERO</b>',
                                            readOnly: true

                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 230,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechaventaId',
                                            name: 'fecha_venta',
                                            value: new Date()
                                        }
                                    ]
                                },{
                                    xtype: 'fieldcontainer',
                                    height: 35,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'id_sucursal',
                                            name : 'id_sucursal',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'observaId',
                                            name : 'id_observa',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'permiteId',
                                            name : 'permite',
                                            hidden: true
                                        },{
                                            xtype: 'textareafield',
                                            fieldCls: 'required',
                                            width: 350,
                                            height: 140,
                                            fieldLabel: 'Observaciones',
                                            itemId: 'dobservaId',
                                            name: 'observaciones',
                                            hidden: true                           
                                        },{
                                            xtype: 'combo',
                                            itemId: 'bodegaId',
                                            labelWidth: 120,
                                            width: 405,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>BODEGA ORIGEN</b>',
                                            forceSelection : true,
                                            name : 'bodegaorigen',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Bodegas',
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 100
                                           
                                        },{
                                            xtype: 'combo',
                                            itemId: 'bodegadestinoId',
                                            labelWidth: 125,
                                            width: 405,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>BODEGA DESTINO</b>',
                                            forceSelection : true,
                                            name : 'bodega_destino',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Bodegas'
                                        }
                                    ]
                                },{
                    xtype: 'fieldset',
                    title: 'Items Documento',
                    fieldDefaults: {
                        labelWidth: 70,
                        align: 'center'                        
                    },
                    items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox'
                        },
                        defaults: {
                            flex: 1
                        },
                        items: [

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'center',     
                            items: [{
                                xtype: 'textfield',
                                width: 135,
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;'
                            }, {xtype: 'splitter'},{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 55,
                                itemId: 'nombreproductoId',
                                fieldLabel: 'Producto',
                                name: 'nomproducto',                                
                                readOnly: true
                            },{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'productoId',
                                fieldLabel: 'Producto',
                                name: 'Productos',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Producto',
                                maxHeight: 25,
                                width: 120,
                                //allowBlank: true,
                                action: 'buscarproductos',
                                itemId: 'buscarproc'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 130,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;'
                                //disabled : true

                            },{
                                xtype: 'numberfield',
                                width: 130,
                                labelWidth: 40,
                                fieldLabel: 'Estado',
                                itemId: 'estadoId',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Seleccionar',
                                maxHeight: 25,
                                width: 120,
                                //allowBlank: true,
                                action: 'buscarprecios',
                                itemId: 'buscarprec'
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 120,
                                labelWidth: 40,
                                minValue: 0,
                                fieldLabel: 'Stock',
                                readOnly: true,
                                itemId: 'cantidadOriginalId',
                                style: 'font-weight: bold;'

                            },{
                                xtype: 'numberfield',
                                width: 80,
                                labelWidth: 40,
                                minValue: 0,
                                fieldLabel: 'secuencia',
                                itemId: 'secuenciaId',
                                style: 'font-weight: bold;',
                                hidden: true

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 120,
                                labelWidth: 60,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId'
                            },{xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 80,
                                allowBlank: true,
                                action: 'agregarItem'
                            }]
                        }

                        ]
                    }]

                     }

                            ]
                        },{
                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle',
                            labelWidth: 50,
                            store: 'preventa.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem'
                            },
                            {
                                iconCls: 'icon-delete',
                                text: 'Editar',
                                action: 'editaritem'
                            }
                            ],
                            height: 280,
                            columns: [
                                { text: 'No',  dataIndex: 'id', width: 50},
                                { text: 'Id producto',  dataIndex: 'id_producto', width: 250, hidden : true },
                                { text: 'Id descuento',  dataIndex: 'id_descuento', width: 250, hidden : true },
                                { text: 'codigo',  dataIndex: 'codigo', width: 250, hidden : true },
                                { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                { text: 'Precio Unitario',  dataIndex: 'precio', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Cantidad',  dataIndex: 'cantidad', align: 'right',width: 100},
                                { text: 'Neto',  dataIndex: 'neto', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Iva',  dataIndex: 'iva', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Total',  dataIndex: 'total', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
                            ]
                            },{
                        xtype: 'fieldset',
                        title: 'Total Documento',
                        height: 80,
                        fieldDefaults: {
                        labelWidth: 120
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'neto',
                            itemId: 'finaltotalnetoId',
                            readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 150,
                            name : 'afecto',
                            itemId: 'finalafectoId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            width: 150,
                            fieldCls: 'required',
                            name : 'iva',
                            itemId: 'finaltotalivaId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top'
                            //renderer: function(valor){return Ext.util.Format.number((iva),"0.000")} 
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 230,
                            name : 'total',
                            itemId: 'finaltotalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL DOCUMENTO</b>',
                            labelAlign: 'top'
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
                            hidden: true
                        }]
                    }
                    ]

                }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',{
                            xtype: 'button',
                            text: 'Observaciones',
                            iconCls: '',
                            width: 150,
                            scale: 'large',
                            allowBlank: true,
                            action: 'agregarobservaciones'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabarvaldedespacho',
                            text: 'Grabar / Emitir'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
