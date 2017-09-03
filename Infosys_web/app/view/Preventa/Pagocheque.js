Ext.define('Infosys_web.view.Preventa.Pagocheque', {
    extend: 'Ext.window.Window',
    alias : 'widget.generapagocheque',

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

    autoShow: false,
    height: 460,
    width: 1360,
    closable: false,
    layout: 'fit',
    title: 'Pago Cheque Caja',

    initComponent: function() {
        var me = this;
        /*var formaPago = Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {"id":1, "nombre":"CONTADO"},
            {"id":11, "nombre":"CREDITO"},
            {"id":2, "nombre":"PAGO CHEQUE "},
            {"id":4, "nombre":"TARJETA DE DEBITO"},
            {"id":7, "nombre":"TARJETA DE CREDITO"}
        ]
        }); */
        var stItms = Ext.getStore('recaudacion.Items');
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
                        xtype: 'fieldset',
                        title: 'Condicion Venta',
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
                            width: 10,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'validapagoId',
                            fieldLabel: '<b>VALIDA</b>',
                            hidden: true
                        },{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 180,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'condpagoId',
                            fieldLabel: '<b>FORMA PAGO</b>',
                            fieldCls: 'required',
                            store: 'Cond_pago',
                            name: 'cond_pago',
                            value: "1",
                            valueField: 'id',
                            displayField: 'nombre'                           
                        },{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'total',
                            itemId: 'finaltotalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'cancela',
                            itemId: 'valorcancelaId',
                            fieldLabel: '<b>CANCELA</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'vuelto',
                            itemId: 'valorvueltoId',
                            fieldLabel: '<b>VUELTO</b>',
                            disabled : false,
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 180,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'numchequeId',
                            fieldLabel: '<b>NUMCHEQUE</b>',
                            value: 0,
                            labelAlign: 'top',
                            disabled : true
                        },{xtype: 'splitter'},{
                            xtype: 'datefield',
                            labelAlign: 'top',
                            fieldCls: 'required',
                            maxHeight: 35,
                            labelWidth: 50,
                            width: 170,
                            fieldLabel: '<b>FECHA</b>',
                            itemId: 'fechacheqId',
                            name: 'fecha_cheque',
                            value: new Date()
                        },{xtype: 'splitter'},{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 210,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'bancoId',
                            fieldLabel: '<b>BANCO</b>',
                            fieldCls: 'required',
                            store: 'Banco',
                            name: 'banco',
                            valueField: 'id',
                            displayField: 'nombre',
                            disabled : true  
                           
                        },{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'num_boleta',
                            itemId: 'numboleta2Id',
                            fieldLabel: '<b>No.BOLETA</b>',
                            labelAlign: 'top',
                            align: 'right'
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpId',
                            hidden: true
                        },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                //labelAlign: 'top',
                                itemId: 'agregarId',
                                iconCls: 'icon-plus',
                                width: 80,
                                allowBlank: true,
                                action: 'agregarrecaudacion'
                            }]
                    }
                    ]

                },{
                  xtype: 'fieldset',
                  title: 'Recaudacion ',
                  height: 230,
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
                          itemId: 'recaudacionId',
                          title: 'Ingreso',
                          store: 'recaudacion.Items',
                          height: 200,
                          columns: [
                              { text: 'Id Pago',  dataIndex: 'id_pago', width: 250, hidden: true },
                              { text: 'Forma Pago',  dataIndex: 'nom_forma', width: 250 },
                              { text: 'Documento',  dataIndex: 'num_doc', width: 100},
                              { text: 'Num Cheque',  dataIndex: 'num_cheque', width: 100},
                              { text: 'Id Banco',  dataIndex: 'id_banco', width: 100, hidden: true},
                              { text: 'Detalle',  dataIndex: 'detalle', width: 200},
                              { text: 'Valor', dataIndex: 'valor_pago', width: 150},
                              { text: 'Monto', dataIndex: 'valor_cancelado', width: 150},
                              { text: 'Vuelto', dataIndex: 'valor_vuelto', width: 150},
                              { text: 'Fecha Docu', dataIndex: 'fecha_comp',hidden: true, width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')},
                              { text: 'Fecha Transac', dataIndex: 'fecha_transac',hidden: true, width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')}
                             
                          ]
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
                            itemId: 'aceptacheques',
                            disabled : false,
                            maxHeight: 40,
                            action: 'aceptacheques',
                            text: 'PAGAR'
                        },{
                            xtype: 'button',
                            iconCls: 'icon-exit',
                            scale: 'large',
                            //labelWidth: 30,
                            itemId: 'salircheques',
                            disabled : false,
                            maxHeight: 40,
                            action: 'salircheques',
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
