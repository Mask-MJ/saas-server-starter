-- CreateTable
CREATE TABLE "AnalysisTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "remark" TEXT NOT NULL DEFAULT '',
    "dictTypeId" INTEGER NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "ruleId" INTEGER NOT NULL DEFAULT 1,
    "createBy" TEXT NOT NULL,
    "updateBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalysisTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisTaskResult" (
    "id" SERIAL NOT NULL,
    "analysisTaskId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,

    CONSTRAINT "AnalysisTaskResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT DEFAULT '',
    "longitude" TEXT DEFAULT '',
    "latitude" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createBy" TEXT NOT NULL,
    "updateBy" TEXT,
    "parentId" INTEGER,
    "city" TEXT DEFAULT '',
    "county" TEXT DEFAULT '',
    "province" TEXT DEFAULT '',
    "code" TEXT DEFAULT '',
    "industry" TEXT DEFAULT '',

    CONSTRAINT "Factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "remark" TEXT NOT NULL DEFAULT '',
    "factoryId" INTEGER NOT NULL,
    "createBy" TEXT NOT NULL,
    "updateBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "serial" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remark" TEXT NOT NULL DEFAULT '',
    "serviceAppId" TEXT NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "faultCategory" TEXT NOT NULL,
    "possibleCauseAnalysis" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "remedialActions" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Valve" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "unit" TEXT,
    "fluidName" TEXT,
    "criticalApplication" TEXT,
    "serialNumber" TEXT,
    "since" TIMESTAMP(3),
    "valveBrand" TEXT,
    "valveSize" TEXT,
    "valveEndConnection" TEXT,
    "valveBodyMaterial" TEXT,
    "valveBonnet" TEXT,
    "valveTrim" TEXT,
    "valveSeatLeakage" TEXT,
    "valveDescription" TEXT,
    "actuatorBrand" TEXT,
    "actuatorSize" TEXT,
    "handwheel" TEXT,
    "actuatorDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createBy" TEXT NOT NULL DEFAULT '',
    "updateBy" TEXT,
    "valveSeries" TEXT,
    "source" TEXT,
    "lsBrand" TEXT,
    "lsModel" TEXT,
    "lsQty" INTEGER,
    "lsDescription" TEXT,
    "no" TEXT,
    "pilotBrand" TEXT,
    "pilotModel" TEXT,
    "pilotQty" INTEGER,
    "pilotDescription" TEXT,
    "positionerBrand" TEXT,
    "positionerModel" TEXT,
    "positionerDescription" TEXT,
    "qeBrand" TEXT,
    "qeModel" TEXT,
    "qeQty" INTEGER,
    "qeDescription" TEXT,
    "regulatorBrand" TEXT,
    "regulatorModel" TEXT,
    "regulatorDescription" TEXT,
    "signalComparatorBrand" TEXT,
    "signalComparatorModel" TEXT,
    "signalComparatorDescription" TEXT,
    "sovBrand" TEXT,
    "sovModel" TEXT,
    "sovQty" INTEGER,
    "sovDescription" TEXT,
    "stroke" TEXT,
    "tripValveBrand" TEXT,
    "tripValveModel" TEXT,
    "tripValveDescription" TEXT,
    "vbBrand" TEXT,
    "vbModel" TEXT,
    "vbQty" INTEGER,
    "vbDescription" TEXT,
    "actuatorSeries" TEXT,
    "parts" TEXT,
    "valveRating" TEXT,
    "valveStemSize" TEXT,
    "actuatorActionForm" TEXT,
    "valveCv" TEXT,
    "analysisTaskId" INTEGER,
    "deviceId" INTEGER,
    "factoryId" INTEGER NOT NULL,

    CONSTRAINT "Valve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValveHistoryDataList" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "valveId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,

    CONSTRAINT "ValveHistoryDataList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FactoryToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FactoryToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ValveToWorkOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ValveToWorkOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisTaskResult_analysisTaskId_key" ON "AnalysisTaskResult"("analysisTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "Factory_name_key" ON "Factory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_serial_key" ON "WorkOrder"("serial");

-- CreateIndex
CREATE INDEX "_FactoryToRole_B_index" ON "_FactoryToRole"("B");

-- CreateIndex
CREATE INDEX "_ValveToWorkOrder_B_index" ON "_ValveToWorkOrder"("B");

-- AddForeignKey
ALTER TABLE "AnalysisTask" ADD CONSTRAINT "AnalysisTask_dictTypeId_fkey" FOREIGN KEY ("dictTypeId") REFERENCES "DictType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisTask" ADD CONSTRAINT "AnalysisTask_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisTaskResult" ADD CONSTRAINT "AnalysisTaskResult_analysisTaskId_fkey" FOREIGN KEY ("analysisTaskId") REFERENCES "AnalysisTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valve" ADD CONSTRAINT "Valve_analysisTaskId_fkey" FOREIGN KEY ("analysisTaskId") REFERENCES "AnalysisTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valve" ADD CONSTRAINT "Valve_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valve" ADD CONSTRAINT "Valve_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValveHistoryDataList" ADD CONSTRAINT "ValveHistoryDataList_valveId_fkey" FOREIGN KEY ("valveId") REFERENCES "Valve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FactoryToRole" ADD CONSTRAINT "_FactoryToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FactoryToRole" ADD CONSTRAINT "_FactoryToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ValveToWorkOrder" ADD CONSTRAINT "_ValveToWorkOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Valve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ValveToWorkOrder" ADD CONSTRAINT "_ValveToWorkOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
