import { prisma } from "./prisma-client"

async function up() {
	await prisma.category.createMany({
		data: [
			{
				title: "Канцелярия",
			},
			{
				title: "Бытовая Химия",
			},
			{
				title: "Хоз. Товары",
			},
		],
	})
	await prisma.store.createMany({
		data: [
			{
				title: "ИП Новиков",
			},
			{
				title: "ТД Негоциант",
			},
		],
	})
}
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Store" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductRange" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "StoreHouse" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Orders" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
