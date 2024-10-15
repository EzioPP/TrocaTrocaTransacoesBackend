--Banco usuario:
create table usuario (
	id_usuario serial primary key,
	login varchar (50) unique,
	senha varchar (50),
	id_cliente int,
	foreign key (id_cliente) references cliente (id_cliente)
);

create table cliente (
	id_cliente serial primary key,
	cpf varchar (11) unique,
	nome varchar (50),
	telefone varchar (11),
	email varchar (50) unique,
	endereço varchar (150)
);	

create table cartao (
	id_cartao serial primary key,
	data_validade date,
	numero_cartao varchar (16) unique,
	tipo_cartao varchar (10),
	limite_cartao decimal (10,2),
	id_cliente int,
	foreign key (id_cliente) references cliente (id_cliente)
);

create table transacao (
	id_transacao serial primary key,
	data_transacao date,
	valor decimal (10,2),
	status varchar (20),
	tipo varchar (20),
	id_cliente int,
	foreign key (id_cliente) references cliente (id_cliente)
);
create table pix (
	id_pix serial primary key,
	tipo_chave varchar (20) unique,
	id_cliente int,
	foreign key (id_cliente) references cliente (id_cliente)
);

create table relatorio (
	id_relatorio serial primary key,
	data_relatorio date,
	tipo_relatorio varchar (50),
	id_cliente int,
	foreign key (id_cliente) references cliente (id_cliente)
);