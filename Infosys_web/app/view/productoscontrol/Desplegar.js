Ext.define('Infosys_web.view.productoscontrol.Desplegar', {
    extend: 'Ext.window.Window',
    alias : 'widget.productoscontroldesplegar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar Valor Productos',
    layout: 'fit',
    autoShow: true,
    width: 850,
    modal: true,
    height: 540,
    iconCls: 'icon-sheet',

    layout: {
                type: 'fit'
            },

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            bodyPadding: 30,
            //frame: true,
            border: false,
            fieldDefaults: {
            //anchor: '100%',
            //labelAlign: 'left',
            combineErrors: true,
            //labelWidth: 150,
            msgTarget: 'side'
            },

            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                anchor: '100%',
                items: [
            {
                xtype: 'textfield',
                name : 'codigo',
                fieldLabel: 'Codigo',
                width: 280,
                labelWidth: 105,
                readOnly: true
                          
            }]
        },{
            xtype: 'textfield',
            name : 'nombre',
            itemId: 'nombreproductoId',
            fieldLabel: 'Nombre Producto',
            width: 480,
            labelWidth: 105,
            readOnly: true
        },{
            xtype: 'textfield',
            name : 'id',
            itemId: 'Id',
            fieldLabel: 'id',
            hidden:true
        },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
            xtype: 'combo',
            itemId: 'marcaId',
            fieldLabel: 'Marca',
            forceSelection : true,
            width: 240,
            labelWidth: 105,
            editable : false,
            name : 'id_marca',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Marcas',
            readOnly : true
        },{xtype: 'splitter'},{
            xtype: 'combo',
            itemId: 'tipobodegaId',
            fieldLabel: 'Bodega',
            forceSelection : true,
            width: 240,
            labelWidth: 105,
            editable : false,
            name : 'id_bodega',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Bodegas'
        },{xtype: 'splitter'},{
            xtype: 'combo',
            itemId: 'tipofamiliaId',
            fieldLabel: 'Familias',
            forceSelection : true,
            width: 240,
            labelWidth: 105,
            editable : false,
            name : 'id_familia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Familias',
            readOnly : true
        }]
        },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
            xtype: 'combo',
            itemId: 'tipoagrupacionId',
            fieldLabel: 'Agrupaciones',
            forceSelection : true,
            width: 240,
            labelWidth: 105,
            editable : false,
            name : 'id_agrupacion',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Agrupacion',
            readOnly : true
        },{xtype: 'splitter'},{
            xtype: 'combo',
            itemId: 'tiposubfamiliaId',
            fieldLabel: 'Sub Familia',
            forceSelection : true,
              width: 240,
            labelWidth: 105,
            editable : false,
            name : 'id_subfamilia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Subfamilia',
            readOnly : true
        },{xtype: 'splitter'},{
                xtype: 'combo',
                itemId: 'tipounimedidaId',
                fieldLabel: 'Unidad Medida',
                forceSelection : true,
                width: 240,
                labelWidth: 105,
                editable : false,
                name : 'id_uni_medida',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Medidas',
                readOnly : true
            }]
        },{
            xtype: 'fieldset',
            title: 'Precios',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Costo',
                    itemId: 'costoId',
                    width: 180,
                    labelWidth: 60,
                    name:'p_calcula_compra',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    align: 'center'
                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    itemId: 'valvulaId',
                    fieldLabel: 'Valvula',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    name:'p_valvula',
                    align: 'right'

                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    itemId: 'maestroId',
                    fieldLabel: 'Com. Maestro',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    name:'com_maestro',
                    align: 'right'

                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                     width: 180,
                    labelWidth: 60,
                    fieldLabel: 'Com. Vendedor',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    itemId: 'vendedorId',
                    name:'com_vendedor',
                    align: 'right'
                }
                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [                
                {
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    fieldLabel: '%. Adicional',
                    itemId: 'adicionalId',
                    name:'por_adicional',
                    align: 'right'

                },{xtype: 'splitter'},{
                    
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    fieldLabel: 'Margen Venta %',
                    itemId: 'margenId',
                    name:'mar_venta',
                    align: 'right'

                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    fieldLabel: 'Precio s/Iva',
                    itemId: 'preciosinivaId',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    name:'p_ventasiva',
                    align: 'right',
                    readOnly : true
                },{xtype: 'splitter'},{
                    xtype: 'numberfield',
                     width: 180,
                    labelWidth: 60,
                    itemId: 'precioivaId',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    fieldLabel: 'Precio c/Iva',
                    name:'p_ventadiva',
                    align: 'right',
                    readOnly : true
                }

                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [                
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ultima Compra',
                    width: 180,
                    labelWidth: 60,
                    name:'p_ult_compra',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    align: 'center',
                    readOnly : true
                },{xtype: 'splitter'},
                {
                    xtype: 'numberfield',
                    width: 180,
                    labelWidth: 60,
                    itemId: 'pventaId',
                    fieldLabel: ' Precio Venta',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    name:'p_venta',
                    align: 'right',
                    readOnly : true

                    //renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    //anchor: '20%',
                    //readOnly : true
                }

                ]
            },
            ]
        },{
            xtype: 'fieldset',
            title: 'Stock Inventario',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Sucursal',
                    name:'stock_bodega',
                    itemId: 'bodegaId',
                    width: 180,
                    labelWidth: 60,
                    align: 'center',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    readOnly : true
                },{xtype: 'splitter'},{
                    xtype: 'textfield',
                    fieldLabel: 'Total',
                    name:'stock',
                    width: 180,
                    labelWidth: 60,
                    align: 'left',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    readOnly : true
                },{xtype: 'splitter'},{
                    xtype: 'numberfield',
                    fieldLabel: 'Critico',
                    itemId: 'stockcriticoId',
                    name:'stock_critico',
                    width: 180,
                    labelWidth: 60,
                    align: 'left',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                }

                ]
            }
            ]
        },{
            xtype: 'fieldset',
            title: '',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'filefield',
                    id: 'imagen',
                    emptyText: 'Agregar Imagen',
                    fieldLabel: 'Imagen',
                    //labelStyle: ' font-weight:bold',
                    //labelWidth: 150,
                    hidden: true,
                    name: 'imagen',
                    allowBlank : true,
                    buttonText: 'Examinar',
                    listeners:{
                        afterrender:function(cmp){
                          cmp.fileInputEl.set({
                             accept: 'image/*' // or w/e type
                          });
                        }
                    }              
                },{
                    xtype: 'displayfield',
                    width: 320                                          
                },{
                xtype: 'button',
                iconCls: 'icon-calculator',
                action: 'calcularprecio',
                text : 'Calcular'
                }              

                ]
            }
            ]
        }]
    }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarcontrolproductos'
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
