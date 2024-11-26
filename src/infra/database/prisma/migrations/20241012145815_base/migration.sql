-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "usuario" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "card" (
    "id_cartao" SERIAL NOT NULL,
    "data_validade" DATE,
    "numero_cartao" VARCHAR(16),
    "tipo_cartao" VARCHAR(10),
    "limite_cartao" DECIMAL(10,2),
    "id_cliente" INTEGER,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id_cartao")
);

-- CreateTable
CREATE TABLE "client" (
    "id_cliente" SERIAL NOT NULL,
    "cpf" VARCHAR(11),
    "nome" VARCHAR(50),
    "telefone" VARCHAR(11),
    "email" VARCHAR(50),
    "endereço" VARCHAR(150),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "pix" (
    "id_pix" SERIAL NOT NULL,
    "tipo_chave" VARCHAR(20),
    "id_cliente" INTEGER,

    CONSTRAINT "pix_pkey" PRIMARY KEY ("id_pix")
);

-- CreateTable
CREATE TABLE "report" (
    "id_relatorio" SERIAL NOT NULL,
    "data_relatorio" DATE,
    "tipo_relatorio" VARCHAR(50),
    "id_cliente" INTEGER,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id_relatorio")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id_transacao" SERIAL NOT NULL,
    "data_transacao" DATE,
    "valor" DECIMAL(10,2),
    "status" VARCHAR(20),
    "tipo" VARCHAR(20),
    "id_cliente" INTEGER,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id_transacao")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_usuario_key" ON "admin"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "card_numero_cartao_key" ON "card"("numero_cartao");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pix_tipo_chave_key" ON "pix"("tipo_chave");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pix" ADD CONSTRAINT "pix_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;
