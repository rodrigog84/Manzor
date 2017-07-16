Ext.define('Infosys_web.view.Preventa.IngresoGastos', {
    extend: 'Ext.window.Window',
    alias : 'widget.ingresogastos',

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
    height: 460,
    width: 1360,
    layout: 'fit',
    title: 'Ingreso Gastos',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('Gastos');
        stItms.reload();
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
                        xtype: 'fieldset',
                        title: 'Ingreso Gatos',
                        align: 'top',

                        fieldDefaults: {
                        labelWidth: 120
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'total',
                            itemId: 'numerogastolId',
                            fieldLabel: '<b>NUMERO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'cancela',
                            itemId: 'valorgastoId',
                            fieldLabel: '<b>MONTO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'efectivo',
                            itemId: 'efectivoId',
                            readOnly: true,
                            aling: 'right',
                            fieldLabel: '<b>EFECTIVO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(efectivo),"0.000")}

                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'cancela',
                            itemId: 'efectivonId',
                            fieldLabel: '<b>EFECTIVO</b>',
                            labelAlign: 'top',
                            hidden: true
                        },{xtype: 'splitter'},{
                            xtype: 'datefield',
                            labelAlign: 'top',
                            fieldCls: 'required',
                            maxHeight: 35,
                            labelWidth: 50,
                            width: 170,
                            fieldLabel: '<b>FECHA</b>',
                            itemId: 'fechagastoId',
                            name: 'fecha_cheque',
                            value: new Date()
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 500,
                            name : 'detalle',
                            itemId: 'detalleId',
                            fieldLabel: '<b>DETALLE</b>',
                            labelAlign: 'top',
                            align: 'right'
                        },
                        {xtype: 'splitter'},,{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 145,
                            name : 'num_doc',
                            itemId: 'numdocId',
                            fieldLabel: '<b>DOC. ASOC.</b>',
                            labelAlign: 'top',
                            align: 'right'
                        },
                        {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                //labelAlign: 'top',
                                itemId: 'agregargastosId',
                                iconCls: 'icon-plus',
                                width: 80,
                                allowBlank: true,
                                action: 'agregargastos'
                            }]
                    }
                    ]

                },{
                  xtype: 'fieldset',
                  title: 'Gastos Caja ',
                  height: 260,
                  items: [{
                          xtype: 'grid',
                          tbar: [

                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                iconCls: 'icon-delete',
                                allowBlank: true,
                                action: 'eliminaritem'
                            }
                            ],
                          itemId: 'gastosId',
                          title: 'Gastos',
                          store: 'Gastos',
                          height: 200,
                          columns: [
                              { text: 'Numero',  dataIndex: 'numero', width: 250 },
                              { text: 'Detalle',  dataIndex: 'detalle', width: 650},
                              { text: 'id_caja',  dataIndex: 'id_caja', width: 100, hidden: true},
                              { text: 'id_cajero',  dataIndex: 'id_cajero', width: 200, hidden: true},
                              { text: 'Monto', dataIndex: 'monto', width: 150},
                              { text: 'Fecha', dataIndex: 'fecha',hidden: true, width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')}
                          ]
                                  },{
                        xtype: 'pagingtoolbar',
                        dock:'bottom',
                        store: 'Gastos',
                        displayInfo: true
                    }],
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
                    items: ['->',
                        {
                            xtype: 'tbseparator'
                        },{
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            //labelWidth: 30,
                            itemId: 'GeneragAstosId',
                            disabled : false,
                            maxHeight: 40,
                            action: 'generagastos',
                            text: 'SALIR'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
