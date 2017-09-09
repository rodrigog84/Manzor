<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Productos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function elimina(){

	    $resp = array();
	    $idproducto = $this->input->post('idproducto');

	    $query = $this->db->query('SELECT * FROM detalle_factura_cliente WHERE id_producto ="'.$idproducto.'"');

	    if($query->num_rows()>0){

	    	 $resp['success'] = false;
	    	 echo json_encode($resp);

	    }else{


	    $query = $this->db->query('DELETE FROM productos WHERE id = "'.$idproducto.'"');

	    
	    $resp['success'] = true;
	    echo json_encode($resp);

	    	

	    };

	  }

	
	public function save(){

		$resp = array();
		
        $id = $_REQUEST['codigo'];

    	$config['upload_path'] = "./imagenes_productos/"	;
        $config['file_name'] = $_REQUEST['codigo'];
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        $this->load->library('upload', $config);
        $this->upload->do_upload("imagen");
        $dataupload = $this->upload->data();
        

        $data = array(
		        'nombre' => strtoupper($_REQUEST['nombre']),
		        'codigo' => $_REQUEST['codigo'],			
		        'p_ult_compra' => $_REQUEST['p_ult_compra'],
		        'p_may_compra' => $_REQUEST['p_may_compra'],
		        'p_promedio' => $_REQUEST['p_promedio'],
		        'p_venta' => $_REQUEST['p_venta'],
		        'p_costo' => $_REQUEST['p_costo'],
		        'stock' => $_REQUEST['stock'],
		        'id_ubi_prod' => $_REQUEST['id_ubi_prod'],
		        'id_marca' => $_REQUEST['id_marca'],
		        'id_uni_medida' => $_REQUEST['id_uni_medida'],
		        'id_bodega' => $_REQUEST['id_bodega'],
		        'id_familia' => $_REQUEST['id_familia'],
		        'id_agrupacion' => $_REQUEST['id_agrupacion'],
		        'id_subfamilia' => $_REQUEST['id_subfamilia'],
		        'imagen' => $dataupload['orig_name']
		);


          $this->db->insert('productos', $data);
          $idproducto = $this->db->insert_id();

          $existencia = array(
			'id_producto' => $idproducto,
			'id_bodega' => $_REQUEST['id_bodega'],
		  );

		  $this->db->insert('existencia', $existencia);         
           

          $resp['success'] = true;

          $this->Bitacora->logger("I", 'productos', $id);
          $this->Bitacora->logger("I", 'existencia', $id);
	      
        echo json_encode($resp);

	}

	public function update2(){

		$resp = array();

		$id = $_REQUEST['id'];

  		$config['upload_path'] = "./imagenes_productos/"	;
        $config['file_name'] = $_REQUEST['codigo'];
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        $this->load->library('upload', $config);
        $this->upload->do_upload("imagen");
        $dataupload = $this->upload->data();


		$data = array(
			'nombre' => strtoupper($_REQUEST['nombre']),
	        'codigo' => $_REQUEST['codigo'],			
	        'p_ult_compra' => $_REQUEST['p_ult_compra'],
	        'p_venta' => $_REQUEST['p_venta'],
	        'p_ventadiva' => $_REQUEST['p_ventadiva'],
	        'p_ventasiva' => $_REQUEST['p_ventasiva'],
	        'mar_venta' => $_REQUEST['mar_venta'],
	        'por_adicional' => $_REQUEST['por_adicional'],
	        'com_vendedor' => $_REQUEST['com_vendedor'],
	        'com_maestro' => $_REQUEST['com_maestro'],
	        'p_valvula' => $_REQUEST['p_valvula'],
	        'p_calcula_compra' => $_REQUEST['p_calcula_compra'],
	        'stock_critico' => $_REQUEST['stock_critico'],
	    );

		$this->db->where('id', $id);
		
		$this->db->update('productos', $data); 
		$resp['success'] = true;

		$this->Bitacora->logger("M", 'productos', $id);

        echo json_encode($resp);
		}
	
	
	public function update(){

		$resp = array();

		$id = $_REQUEST['id'];

  		$config['upload_path'] = "./imagenes_productos/"	;
        $config['file_name'] = $_REQUEST['codigo'];
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        $this->load->library('upload', $config);
        $this->upload->do_upload("imagen");
        $dataupload = $this->upload->data();


		$data = array(

			'nombre' => strtoupper($_REQUEST['nombre']),
	        'codigo' => $_REQUEST['codigo'],			
	        'p_ult_compra' => $_REQUEST['p_ult_compra'],
	        'p_may_compra' => $_REQUEST['p_may_compra'],
	        'p_promedio' => $_REQUEST['p_promedio'],
	        'p_venta' => $_REQUEST['p_venta'],
	        'p_costo' => $_REQUEST['p_costo'],
	        'stock' => $_REQUEST['stock'],
	        'id_ubi_prod' => $_REQUEST['id_ubi_prod'],
	        'id_uni_medida' => $_REQUEST['id_uni_medida'],
	        'id_bodega' => $_REQUEST['id_bodega'],
	        'id_familia' => $_REQUEST['id_familia'],
	        'id_agrupacion' => $_REQUEST['id_agrupacion'],
	        'id_subfamilia' => $_REQUEST['id_subfamilia'],
	        'imagen' => $dataupload['orig_name']
	    );

		$this->db->where('id', $id);
		
		$this->db->update('productos', $data); 
		$resp['success'] = true;

		$this->Bitacora->logger("M", 'productos', $id);

        echo json_encode($resp);
		}

	public function buscarp(){

		$nombres = $this->input->post('nombre');
		$idBodega = $this->input->post('bodega');

		$query = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
		left join productos c on (acc.id_producto = c.id)
		left join bodegas b on (acc.id_bodega = b.id)
		WHERE acc.id_producto = "'.$nombres.'" and acc.id_bodega = "'.$idBodega.'"');		

		$row = $query->first_row();
	   	$resp['cliente'] = $row;
        $resp['success'] = true;
               
        echo json_encode($resp);

	}

	public function buscacodigo(){

		$nombres = $this->input->post('codigo');
		$idBodega = $this->input->post('idBodega');
		$resp = array();

		$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
		left join mae_ubica c on (acc.id_ubi_prod = c.id)
		left join marcas m on (acc.id_marca = m.id)
		left join mae_medida ca on (acc.id_uni_medida = ca.id)
		left join familias fa on (acc.id_familia = fa.id)
		left join agrupacion ag on (acc.id_agrupacion = ag.id)
		left join subfamilias sb on (acc.id_subfamilia = sb.id)
		left join bodegas bo on (acc.id_bodega = bo.id)
		WHERE acc.codigo = "'.$nombres.'"');

		if($query->num_rows()>0){
	   			$row = $query->first_row();
	   			$nombres = ($row->id);

				$query2 = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
				left join productos c on (acc.id_producto = c.id)
				left join bodegas b on (acc.id_bodega = b.id)
				WHERE acc.id_producto = "'.$nombres.'" and acc.id_bodega = "'.$idBodega.'"');
				
				if($query2->num_rows()>0){		

				$row2 = $query2->first_row();
			   	$resp['cliente'] = $row2;
		        $resp['success'] = true;
		        $resp['codigo'] = $nombres;
		        $resp['bodega'] = $idBodega;

		        };			   	
	   	}else{

	   		 $resp['success'] = false;
	   		 $resp['codigo'] = $nombres;
	   		
	   	};

	   	$resp['codigo'] = $nombres;
		$resp['bodega'] = $idBodega;
	   	$resp['bodega'] = $idBodega;
	   	
        echo json_encode($resp);

	}

	public function productosfact(){

		$resp = array();
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');
        $bodega = $this->input->get('idbodega');
        $total= 0;

        if($nombres) {	        
		
			$sql_nombre = "";
		        $arrayNombre =  explode(" ",$nombres);

		        foreach ($arrayNombre as $nombre) {
		        	$sql_nombre .= "c.nombre like '%".$nombre."%' and ";
		        }

				$query2 = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
			left join productos c on (acc.id_producto = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
				WHERE ' . $sql_nombre . ' 1 = 1 and acc.id_bodega = "'.$bodega.'"');

				foreach ($query2->result() as $row)		    
				{
				$total = $total +1;		
				}
				$countAll = $total;

				$query = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
			left join productos c on (acc.id_producto = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
				WHERE ' . $sql_nombre . ' 1 = 1 and acc.id_bodega = "'.$bodega.'"
				limit '.$start.', '.$limit.'');		

			
		}else{

			  $query2 = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
			left join productos c on (acc.id_producto = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
				WHERE acc.id_bodega = "'.$opcion.'"');

				foreach ($query2->result() as $row)		    
				{
				$total = $total +1;		
				}
				$countAll = $total;

				$query = $this->db->query('SELECT acc.*, c.codigo as codigo ,c.nombre as nombre, b.nombre as nom_bodega, c.p_costo as p_costo, c.p_venta as p_venta FROM existencia acc
			left join productos c on (acc.id_producto = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
				WHERE acc.id_bodega = "'.$opcion.'"
				limit '.$start.', '.$limit.'');		

		};		

		$data = array();
			
		foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

         echo json_encode($resp);

		
	}

	
	public function getAll(){
		
		$resp = array();
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
        $familia = $this->input->get('familia');
        $subfamilia = $this->input->get('subfamilia');
        $agrupacion = $this->input->get('agrupacion');
        $opcion =  $this->input->get('opcion');
        $valor = 0;
        $total= 0;

        if (!$opcion){        	
        	$opcion = "Todos";
        };

        //$countAll = $this->db->count_all_results("clientes");
        
		
		if($opcion == "Nombre"){

			if($nombres) {	        
		
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "acc.nombre like '%".$nombre."%' and ";
	        }

	        $query2 = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1
			limit '.$start.', '.$limit.'');

			foreach ($query2->result() as $row)		    
			{
				$total = $total +1;		
			}
			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');

			
		}else if($familia) {
			$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"');

			$total= 0;
				
			foreach ($query2->result() as $row)		    
			{
				$total = $total +1;		
			}
			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"
			limit '.$start.', '.$limit.'');

					
		}else if($subfamilia) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_subfamilia like "%'.$subfamilia.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}
	

		}else if($agrupacion) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_agrupacion like "%'.$agrupacion.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}
		}

		};

		if($opcion == "Codigo"){

			if($nombres) {	        
		
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.codigo like "%'.$nombres.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

		}else if($familia) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

					
		}else if($subfamilia) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_subfamilia like "%'.$subfamilia.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

		}else if($agrupacion) {
			
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_agrupacion like "%'.$agrupacion.'%"');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

			  

		}

		};

		if($opcion == "Todos"){

			if($familia) {
			$count = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"');

			$total= 0;
				
			foreach ($count->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"
			limit '.$start.', '.$limit.'');



		    }else if($subfamilia) {
			$count = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_subfamilia like "%'.$subfamilia.'%"
			');

			$total= 0;
				
			foreach ($count->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_subfamilia like "%'.$subfamilia.'%"
			limit '.$start.', '.$limit.'
			');

			
			}else if($agrupacion) {

			$count = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_agrupacion like "%'.$agrupacion.'%"
			');

			$total= 0;
				
			foreach ($count->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_agrupacion like "%'.$agrupacion.'%"
			limit '.$start.', '.$limit.'
			');
			

			}else{
			
			$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.stock > 0 ');

			$total= 0;
				
			foreach ($query2->result() as $row)		    
			{
				$total = $total +1;		
			}
			$countAll = $total;	
			 	   
		
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.stock > 0 
			limit '.$start.', '.$limit.' '
			);
			
		}

	};
		
		$data = array();
						
		foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
