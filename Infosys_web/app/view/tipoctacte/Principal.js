Ext.define('Infosys_web.view.tipoctacte.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipoctacteprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tipos de Cuentas Corrientes',
    store: 'Tipoctacte',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id'
    },{
        header: "Tipo Cta-Cte",
        flex: 1,
        dataIndex: 'nombre'
    },{
        header: "Codigo",
        flex: 1,
        dataIndex: 'codigo'
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregartipoctacte',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editartipoctacte',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexceltipoctacte'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscartipoctacte',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrartipoctacte',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tipoctacte',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
