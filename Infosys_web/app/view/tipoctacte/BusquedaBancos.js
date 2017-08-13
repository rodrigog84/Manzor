Ext.define('Infosys_web.view.tipoctacte.BusquedaBancos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedatipoctacte',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Tipo Cta-Cte',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Tipo Cuentas Corrientes',
            store: 'Tipoctacte',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Bancos",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bbancosnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarbancos',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarbancos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tipoctacte',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
