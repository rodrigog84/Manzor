Ext.define('Infosys_web.view.mecanicos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.mecanicosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Mecanicos',
    store: 'Mecanicos',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Rut",
                flex: 1,
                dataIndex: 'rut'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
           
            },{
                header: "Fono",
                flex: 1,
                dataIndex: 'fono'
           
            },{
                header: "Comision",
                flex: 1,
                dataIndex: 'comision'
           
            },{
                header: "Estado",
                flex: 1,
                dataIndex: 'estado'
           
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
                action: 'agregarmecanicos',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarmecanicos',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelmecanicos'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarmecanicos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarmecanicos',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Mecanicos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
