Ext.define('Infosys_web.view.compras.Principalfactura' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.facturascomprasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Compras',
    store: 'FacturaCompras',
    height: 300,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Id Factura",
        flex: 1,
        dataIndex: 'id',
        align: 'right',
        hidden: true
               
    },{
        header: "Forma",
        flex: 1,
        dataIndex: 'forma',
        align: 'right',
        hidden: true
               
    },{
        header: "Id Factura",
        flex: 1,
        dataIndex: 'id_factura',
        align: 'right',
        hidden: true
               
    },{
        header: "Num Docto",
        flex: 1,
        dataIndex: 'num_factura',
        align: 'right'
               
    },{
        header: "Tipo Documento",
        dataIndex: 'tipo_doc',
        width:280,
        align: 'left'
               
    },{        
        header: "Fecha Emision ",
        flex: 1,
        dataIndex: 'fecha_factura',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Fecha Venc.",
        flex: 1,
        dataIndex: 'fecha_venc',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut_cliente',
        align: 'right'

    },{
        header: "Razon Social",
         width: 300,
        dataIndex: 'nombre_cliente'
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor',
        hidden: true
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'sub_total',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}     
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "Afecto",
        flex: 1,
        dataIndex: 'neto',
         hidden: true,
         align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "I.V.A",
        flex: 1,
        dataIndex: 'iva',
         hidden: true,
         align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "Total",
        flex: 1,
        dataIndex: 'totalfactura',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'mfactura',
                text : 'Compras'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'mfacturaglosa',
                text : 'Compras Glosa'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarcompras',
                text : 'Editar / Agregar',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'generarlibropdf'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelfacturas'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarcompras',
                text : 'Eliminar'
            }],
                  
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: ['-',{
                xtype: 'combo',
                itemId: 'bodegaId',
                labelWidth: 60,
                width: 205,
                fieldCls: 'required',
                maxHeight: 25,
                fieldLabel: '<b>BODEGA</b>',
                forceSelection : true,
                name : 'id_bodega',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Bodegas'
            },'->',{
                xtype: 'combo',
                align: 'center',
                width: 260,
                labelWidth: 85,
                maxHeight: 25,
                matchFieldWidth: false,
                listConfig: {
                    width: 175
                },
                itemId: 'tipoDocumentoId',
                fieldLabel: '<b>DOCUMENTO</b>',
                fieldCls: 'required',
                store: 'Tipo_documento.Selector',
                valueField: 'id',
                displayField: 'nombre'
            },{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 100,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'facturas.Selector2'
            },{
                width: 200,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarpreventa',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpreventa',
                text : 'Cerrar'
            }],
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'FacturaCompras',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
