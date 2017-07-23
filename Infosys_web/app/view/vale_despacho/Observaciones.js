Ext.define('Infosys_web.view.vale_despacho.Observaciones', {
    extend: 'Ext.window.Window',
    alias : 'widget.observacionesvale',

    requires: ['Ext.form.Panel',
               'Ext.form.field.Text'],

    title : 'Observaciones Vele Despacho',
    layout: 'fit',
    autoShow: true,
    width: 380,
    height: 390,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    //anchor: '100%',
                    //labelAlign: 'left',
                    //allowBlank: false,
                    combineErrors: true,
                    //labelWidth: 150,
                    msgTarget: 'side'
                },
                items: [ {
                        xtype: 'textfield',
                        name : 'id',
                        itemId: 'preventaId',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        name : 'valida',
                        value: "NO",
                        itemId: 'validaId',
                        fieldLabel: 'valida',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        fieldCls: 'required',
                        labelWidth: 60,
                        width: 350,
                        height: 30,
                        fieldLabel: 'Nombre',
                        itemId: 'nombreId',
                        name: 'nombre'                            
                    },{
                        xtype: 'textfield',
                        fieldCls: 'required',
                        width: 180,
                        height: 25,
                        fieldLabel: 'Patente Camion',
                        itemId: 'camionId',
                        name: 'pat_camion'                            
                    },{
                        xtype: 'textfield',
                        fieldCls: 'required',
                        width: 180,
                        height: 25,
                        fieldLabel: 'Patente Carro',
                        itemId: 'carroId',
                        name: 'pat_carro'                            
                    },{
                        xtype: 'textfield',
                        fieldCls: 'required',
                        width: 200,
                        height: 25,
                        fieldLabel: 'Fono',
                        itemId: 'fonoId',
                        name: 'fono'                            
                    },{
                        xtype: 'textareafield',
                        fieldCls: 'required',
                        width: 350,
                        height: 140,
                        fieldLabel: 'Observaciones',
                        itemId: 'observaId',
                        name: 'observaciones'                            
                    }
                ]
            }
        ];
        
      this.dockedItems = [{
        xtype: 'toolbar',
        dock: 'bottom',
        id:'butons',
        ui: 'footer',
        items: ['->', {
            xtype: 'button',
            //iconCls: 'icono',
            scale: 'large',
            action: 'ingresaobs',
            text: 'INGRESAR'
        },'-',{
            iconCls: 'icon-reset',
            text: 'Cancelar',
            scope: this,
            handler: this.close
        }]
    }];

        this.callParent(arguments);
    }
});
