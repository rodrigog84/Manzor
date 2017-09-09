Ext.define('Infosys_web.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id'},
        {name: 'id_producto'},
        {name: 'nombre'},
        {name: 'descripcion'},
        {name: 'codigo'},
        {name: 'codigo_barra'},
        {name: 'p_ult_compra'},
        {name: 'p_may_compra'},
        {name: 'p_venta'},

        {name: 'p_ventadiva'},
        {name: 'p_ventasiva'},
        {name: 'mar_venta'},
        {name: 'por_adicional'},

        {name: 'com_vendedor'},
        {name: 'com_maestro'},
        {name: 'p_valvula'},
        {name: 'p_calcula_compra'},
        
        {name: 'p_ferreteria'},
        {name: 'p_neto'},
        {name: 'p_costo'},
        {name: 'nom_uni_medida'},
        {name: 'id_marca'},
        {name: 'nom_marca'},
        {name: 'id_uni_medida'},
        {name: 'nom_medida'},
        {name: 'cantidad_medida', decimalPrecision:3},
        {name: 'nom_ubi_prod'},
        {name: 'id_ubi_prod'},
        {name: 'p_promedio'},
        {name: 'nom_familia'},
        {name: 'id_familia'},
        {name: 'id_bodega'},
        {name: 'nom_bodega'},
        {name: 'id_agrupacion'},
        {name: 'id_subfamilia'},
        {name: 'foto'},
        {name: 'nom_agrupacion'},
        {name: 'nom_subfamilia'},
        {name: 'stock'},
        {name: 'stock_bodega'},
        {name: 'stock_critico'},
        {name: 'stock_total'},        
        {name: 'stock1'},
        {name: 'stock2'},
        {name: 'valor', decimalPrecision:3},

        {name: 'valor_lista', decimalPrecision:3},
        {name: 'imagen'},
    ]
});