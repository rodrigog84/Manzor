<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cambios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}	
	
	public function editapreventa(){

		$resp = array();
		$idcotiza = $this->input->get('idcotiza');
		$factura = 6;
		$correla = $this->db->query('SELECT * FROM correlativos WHERE id like "'.$factura.'"');

		if($correla->num_rows()>0){
	   		$row = $correla->first_row();
	   		$corr = (($row->correlativo)+1); 
	   		$id = ($row->id);

	   		$data3 = array(
	         'correlativo' => $corr
		    );

		    $this->db->where('id', $id);
		  
		    $this->db->update('correlativos', $data3);

		    $this->Bitacora->logger("M", 'correlativos', $id);

		 }
		
		$query = $this->db->query('SELECT ctz.*, cli.direccion as direccion_sucursal, cli.id as id_cliente, cli.nombres as nombres, cli.id_giro as giro, g.nombre as nombre_giro, cli.rut as rut, cli.id_pago as id_pago, cli.direccion as direccion FROM cotiza_cotizaciones ctz
		left join clientes cli ON (ctz.id_cliente = cli.id)
		left join cod_activ_econ g on (cli.id_giro = g.id)
		WHERE ctz.id = '.$idcotiza.'
		');

		$row1 = $query->result();
		$row = $row1[0];
		$rutautoriza = $row->rut;
	   	   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut = ($ruta2."-".$ruta1);
		     
		    };
		 

	   	$row = $query->first_row();
	   	$resp['cliente'] = $row;
	   	$resp['correlanue'] = $corr;
	    $resp['success'] = true;
       

        echo json_encode($resp);
	}

	public function exportPDF(){
		$idcambio = $this->input->get('idcambio');

		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu, b.nombre as nom_bodega, fa.num_factura as num_documento, fa.tipo_documento as tipofactura	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			left join factura_clientes fa on (acc.tipo_documento = fa.id)
			WHERE acc.id = "'.$idcambio.'"'	);
		

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		//items
		$items = $this->db->get_where('cambios_detalle', array('id_cambio' => $idcambio));
		//variables generales
		$codigo = $row->num_comprobante;
		$nombre_contacto = $row->nom_cliente;
		$vendedor = $row->nom_vendedor;
		//$observacion = $row->observacion;
		//$rutobserva = $row->rut_observa;
		//$nom_observa = $row->nom_observa;
		$fecha = $row->fecha_cambio;
		$datetime = DateTime::createFromFormat('Y-m-d', $fecha);
		$fecha = $datetime->format('d/m/Y');
		$totaliva = 0;
		//$neto = ($row->total / 1.19);
		//$iva = ($row->total - $neto);
		//$subtotal = ($row->total + $row->desc);

		if($row->tipofactura=="101"){
		   $nomdocumento="FACTURA ELECTRONICA";
		}else{
		   $nomdocumento="BOLETA";
			
		};


		/*if($row->direccion_sucursal == " "){

			$direccion = $row->direccion;
			
		}else{

			$direccion = $row->direccion_sucursal;
			
		};*/

		$html = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>COMPROBANTE CAMBIOUntitled Document</title>
		<style type="text/css">
		td {
			font-size: 16px;
		}
		p {
		}
		</style>
		</head>

		<body>
		<table width="987px" height="602" border="0">
		    </td>
		  <tr>
		   <td width="197px"><img src="http://localhost/manzor/Infosys_web/resources/images/logo_empresa.png" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>SERGIO ADRIAN MANZOR MANCILLA</p>
		    <p>RUT:3.992.565-6</p>
		    <p>2 SUR # 1629 - Talca - Chile</p>
		    <p>Fonos: (71)2 510250</p>
		    <p>http://</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top"	>
		          <p>N°: '.$codigo.'</p>
		          <!--p>&nbsp;</p-->
		          <p>FECHA EMISION : '.$fecha.'</p>
		          <!--p>&nbsp;</p-->		         
			</td>
		  </tr>
		  <tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h1>'.$row->nom_documento.'</h1></td>
		  </tr>
		  <tr>
		    <td colspan="3" width="987px" >
		    <table width="987px" border="0">
    		<tr>
			<td width="50px">Sr.(es):</td>
			<td width="395px">'. $row->nom_cliente.'</td>
			<td width="100px">Rut:</td>
			<td width="197px">'. number_format(substr($row->rut_cliente, 0, strlen($row->rut_cliente) - 1),0,".",".")."-".substr($row->rut_cliente,-1).'</td>
		    </tr>
		    <tr>
		    <td width="60px">Vendedor:</td>
			<td width="195px">'. $row->nom_vendedor.'</td>
			<td width="60px">Tipo Doc.:</td>
			<td width="100px">'.$nomdocumento.'</td>
		    </tr>		    	
		    	</table>
			</td>
		  </tr>
		  <tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >ENTRADA</td>
		        <td width="280px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >PRODUCTO ENTRADA</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >SALIDA</td>
		        <td width="280px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >PRODUCTO SALIDA</td>
		        <td width="150px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >VALOR ENTRADA</td>
		        <td width="150px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >VALOR SALIDA</td>
		      </tr>';
		$descripciones = '';
		$i = 0;
		foreach($items->result() as $v){
			//$i = 0;
			//while($i < 30){
			$this->db->where('id', $v->id_entrada);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];

			$this->db->where('id', $v->id_salida);
			$producto2 = $this->db->get("productos");	
			$producto2 = $producto2->result();
			$producto2 = $producto2[0];
			
			$html .= '<tr>
			<td width="80px" style="text-align:right">'.$v->cantidad_entrada.'</td>	
			<td width="280px" style="text-align:right">'.$producto->nombre.'</td>
			<td width="80px" style="text-align:right">'.$v->cantidad_salida.'</td>	
			<td width="280px" style="text-align:right">'.$producto2->nombre.'</td>
			<td align="right">$ '.number_format($v->val_entrada, 0, '.', ',').'</td>
			<td align="right">$ '.number_format($v->val_salida, 0, '.', ',').'</td>
			</tr>';
			
			//}
			$i++;
		}

		// RELLENA ESPACIO
		/*while($i < 30){
			$html .= '<tr><td colspan="5">&nbsp;</td></tr>';
			$i++;
		}*/


		$html .= '<tr><td colspan="5">&nbsp;</td></tr></table></td>
		  </tr>
		  		  
		 	  	  
		 
		  
		</table>
		</body>
		</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================

		//include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

		$this->load->library("mpdf");

		$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		
		exit;
	}

	public function save(){

		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numdev = $this->input->post('numerodev');
		$fechadev = $this->input->post('fechadev');
		$fechacom = $this->input->post('fechacom');
		$vendedor = $this->input->post('vendedor');
		$items = json_decode($this->input->post('items'));
		$idfactura =  $this->input->post('idfactura');
		$idbodega =  $this->input->post('idbodega');
		$tipodocumento = 23;
				
		$devolucion = array(
	        'num_comprobante' => $numdev,
	        'id_bodega' => $idbodega,
	        'tipo_documento' => $tipodocumento,
	        'id_cliente' => $idcliente,
	        'id_vendedor' => $vendedor,
	        'fecha' => $fechacom,
	        'fecha_cambio' => $fechadev,
	        'id_factura' => $idfactura
		);

		$this->db->insert('cambios', $devolucion); 
		$idcambio = $this->db->insert_id();

		$secuencia = 0;

		foreach($items as $v){

			$devolucion_detalle = array(
		        'id_cambio' => $idcambio,
		        'id_entrada' => $v->id_entrada,
		        'cantidad_entrada' => $v->can_entrada,
		        'val_entrada' => $v->val_entrada,
		        'id_salida' => $v->id_salida,
		        'cantidad_salida' => $v->can_salida,
		        'val_salida' => $v->val_salida
			);

		$productoentrada = $v->id_entrada;
		$productosalida = $v->id_salida;

		$this->db->insert('cambios_detalle', $devolucion_detalle);

		
		$query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$productoentrada.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)+($v->can_entrada);
				$idexiste = ($row->id);
		        if ($productoentrada==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $productoentrada,
			        'stock' =>  $v->can_entrada,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $productoentrada,
			        'stock' =>  $v->can_entrada,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

		$datos2 = array(
				'num_movimiento' => $numdev,
		        'id_producto' => $productoentrada,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->val_entrada,
		        'cantidad_entrada' => $v->can_entrada,
		        'id_bodega' => $idbodega,
		        'fecha_movimiento' => $fechadev
		);

		$this->db->insert('existencia_detalle', $datos2);
    	
		$query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$productosalida.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)-($v->can_salida);
				$idexiste = ($row->id);
		        if ($productosalida==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $productosalida,
			        'stock' =>  $v->can_salida,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $productosalida,
			        'stock' => $v->can_salida,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

		$datos2 = array(
				'num_movimiento' => $numdev,
		        'id_producto' => $productosalida,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->val_salida,
		        'cantidad_salida' => $v->can_salida,
		        'id_bodega' => $idbodega,
		        'fecha_movimiento' => $fechadev
		);

		$this->db->insert('existencia_detalle', $datos2);
    	
		};

		
        $resp['success'] = true;
		$resp['idcambio'] = $idcambio;

		$this->Bitacora->logger("I", 'cambios', $numdev);
		$this->Bitacora->logger("I", 'cambios_detalle', $idcambio);
		$this->Bitacora->logger("M", 'existencia', $numdev);
		$this->Bitacora->logger("M", 'existencia_detalle', $idcambio);
        

        echo json_encode($resp);
	}

	
	
	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'num_ticket' => $data->num_ticket,
	        'fecha_venta' => $data->fecha_venta,
	        'id_cliente' => $data->id_cliente,
	        'id_sucursal' => $sucursal,
	        'id_vendedor' => $data->id_vendedor,
	        'neto' => $data->neto,
	        'desc' => $data->desc,
	        'total' => $data->total
	    );
		$this->db->where('id', $id);
		
		$this->db->update('preventa', $data); 

        $resp['success'] = true;
        $this->Bitacora->logger("M", 'preventa', $id);


        echo json_encode($resp);

	}

	public function getAll(){
		
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $opcion = $this->input->post('opcion');
        $nombres = $this->input->post('nombre');
        $tipo = $this->input->post('documento');
       
        $countAll = $this->db->count_all_results("cambios");

		if($opcion == "Rut"){

			$data = array();		
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu, b.nombre as nom_bodega	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join bodegas b on (acc.id_bodega = b.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE c.rut = "'.$nombres.'"
			order by acc.id desc'		 

		);

		$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

	    }else if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "and c.nombres like '%".$nombre."%' ";
	        }

	        $data = array();	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE ' . $sql_nombre . ' 
			order by acc.id desc'						
			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	 
		}else if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			order by acc.id desc
			limit '.$start.', '.$limit.''	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else if($opcion == "Numero"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.num_comprobante = "'.$nombres.'"
			order by acc.id desc'	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, co.nombre as nom_documento, v.nombre as nom_vendedor, co.id as id_tip_docu	FROM cambios acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			order by acc.id desc'	

			);


		}

		foreach ($query->result() as $row)
		{
			$rutautoriza = $row->rut_cliente;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };

		   if (strlen($rutautoriza) == 7){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };
		    
		    
		    if (strlen($rutautoriza) == 4){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };	


		     if (strlen($rutautoriza) == 6){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -6, 2);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };

		    
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;
        echo json_encode($resp);
	}
}
