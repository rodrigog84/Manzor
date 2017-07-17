<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Gastos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function elimina(){

		$resp = array();

		$id = $this->input->post('id');
		$caja = $this->input->post('caja');
		$cajero = $this->input->post('cajero');
		$fecha = $this->input->post('fecha');

		$query = $this->db->query('SELECT * FROM control_caja_gastos WHERE id = "'.$id.'" ');

	   	if($query->num_rows()>0){

			$row = $query->first_row();
			$monto = $row->monto;

			$query = $this->db->query('SELECT * FROM control_caja 
			WHERE id_caja = "'.$caja.'" and id_cajero = "'.$cajero.'" and fecha = "'.$fecha.'"');

			if($query->num_rows()>0){

				$row = $query->first_row();
				$idcaja = $row->id;
				$efectivo = $row->efectivo;

				$saldo = ($efectivo + $monto);

				$cajas = array(
		         'efectivo' => $saldo
			    );

			    $this->db->where('id', $idcaja);
			  
			    $this->db->update('control_caja', $cajas);

			};
 

	   	 	$query = $this->db->query('DELETE FROM control_caja_gastos WHERE id = "'.$id.'"');
	    	$resp['success'] = true;

	   	 }else{

	   	 	$resp['success'] = false;
	   	 	

	   	 };	  
	   
	    
	    echo json_encode($resp);	   
		
	}

	public function save(){
		$resp = array();

		$numero = $this->input->post('numero');
		$numdoc = $this->input->post('numdoc');
		$detalle = $this->input->post('detalle');
		$idcaja = $this->input->post('idcaja');
		$idcontrol = $this->input->post('idcontrol');		
		$idcajero = $this->input->post('idcajero');
		$fecha = $this->input->post('fecha');
		$monto = $this->input->post('monto');
		$saldo = $this->input->post('saldo');
		
		$gastos = array(
	        'numero' => $numero,
	        'detalle' => $detalle,
	        'id_caja' => $idcaja,
	        'id_cajero' => $idcajero,
	        'num_doc' => $numdoc,
	        'fecha' => $fecha,
			'monto' => $monto
		);	


		$this->db->insert('control_caja_gastos', $gastos);
		$id = $this->db->insert_id();

		$cajas = array(	        
			'efectivo' => $saldo
		);

		$this->db->where('id',$idcontrol);
		
		$this->db->update('control_caja', $cajas); 

        $resp['success'] = true;

        $this->Bitacora->logger("I", 'control_caja_gastos', $id);

        echo json_encode($resp);

	}

	public function update(){

		$resp = array();
		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
			'nombre' => strtoupper($data->nombre),
	      	'id_cajero' => ($data->id_cajero),
	        'correlativo' => strtoupper($data->correlativo)
	       	          
	    );

		$this->db->where('id', $id);
		
		$this->db->update('cajas', $data); 

        $resp['success'] = true;

        $this->Bitacora->logger("M", 'cajas', $id);

        echo json_encode($resp);

	}

	public function getAll(){

		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $caja = $this->input->post('caja');
        $cajero = $this->input->post('cajero');
        $fecha = $this->input->post('fecha');

		$countAll = $this->db->count_all_results("control_caja_gastos");

		$query = $this->db->query('SELECT acc.*, con.nombre as nom_cajero FROM control_caja_gastos acc 
			left join cajeros con on (acc.id_cajero = con.id)
			left join cajas caj on (acc.id_caja = caj.id)
			WHERE acc.id_caja = "'.$caja.'" and acc.id_cajero = "'.$cajero.'"
			and acc.fecha = "'.$fecha.'"
			limit '.$start.', '.$limit.'');
			
		
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
