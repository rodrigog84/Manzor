<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bodegas extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->nombre;

		$data = array(
	        'nombre' => strtoupper($data->nombre),
	        'direccion' => strtoupper($data->direccion),
	        'codigo' => $data->codigo,
	        'num_otrabajo' => $data->num_otrabajo,
	        'num_boleta' => $data->num_boleta,
	        'num_despacho' => $data->num_despacho,
	        'id_cliente' => $data->id_cliente,
	        'id_sucursal' => $data->id_sucursal
		);

		$this->db->insert('bodegas', $data); 

        $resp['success'] = true;

        $this->Bitacora->logger("I", 'bodegas', $id);

        echo json_encode($resp);

	}

	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'nombre' => strtoupper($data->nombre),
	        'direccion' => strtoupper($data->direccion),
	        'codigo' => $data->codigo,
	        'num_otrabajo' => $data->num_otrabajo,
	        'num_boleta' => $data->num_boleta,
	        'num_despacho' => $data->num_despacho,
	        'id_cliente' => $data->id_cliente,
	        'id_sucursal' => $data->id_sucursal
	        
	    );
		$this->db->where('id', $id);
		
		$this->db->update('bodegas', $data); 

        $resp['success'] = true;

        $this->Bitacora->logger("I", 'bodegas', $id);

        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        //filtro por nombre
        $nombre = $this->input->post('nombre');

		$countAll = $this->db->count_all_results("bodegas");

		if($nombre){

			$query = $this->db->query('SELECT acc.*, cl.rut as rut FROM bodegas acc 
			left join clientes cl on (acc.id_cliente = cl.id)
			left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
			WHERE nombre like "%'.$nombre.'%" 
			limit '.$start.', '.$limit.'');
			
		}else{

			$query = $this->db->query('SELECT acc.*, cl.rut as rut FROM bodegas acc 
			left join clientes cl on (acc.id_cliente = cl.id)
			left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
			limit '.$start.', '.$limit.'');
			}

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
