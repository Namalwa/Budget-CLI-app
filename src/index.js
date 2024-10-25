import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();

app.use(express.json());
const client = new PrismaClient()
 


//Create budget
app.post("/budgets", async(req, res) =>{
   const {id, title, quantity, price} = req.body;
try{
    const newbudget = await client.budget.create({
    data: {
        id,
   quantity,
        title,
        price
 }
   })
   res.status(201).json({message: "budget created successfully", data:newbudget})
}catch (e) {
    res.status(500).json({message: "server error"})
}

});



//Get all budgets
app.get("/budgets", async (req, res) =>{
    try{
        const allBudgets = await client.budget.findMany();
        if(allBudgets.length <= 0) {
            res.status(204).json({ message: "You dont have any budgets yet"})
        } else {
        res.status(200).json({ data: allBudgets})
    }
    } catch (e){
        req.status(500).json({ message: "server error"})
    }
});




//Get single budget
app.get("/budgets/:title", async (req, res) =>{
    const title = req.params.title;
    try{
        const budget = await client.budget.findFirst({
            where: { title: title}
        }) 
        if (!budget) {
            res.status(404).json({ message: `Budget with title ${title} was not found`})
        } else {
            res.status(200).json({ data: budget});
        }

    } catch (e) {
        res.status(500).json({ message: "server error"})
    }
});




//Updating a budget
app.patch("/budgets/:id", async (req, res) => {
    const id = parseInt(req.params.id); 
    const { quantity, title, price } = req.body;

    try {
        const updatedBudget = await client.budget.update({
            where: { id: id },
            data: {
                title: title,
                quantity: quantity,
                price: price
            }
        });
        res.status(200).json({ message: "Budget updated successfully", data: updatedBudget });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
});




//Deleting a budget
app.delete("/budgets/:id", async (req, res) => {
    const id = parseInt(req.params.id); 

    try {
        const deletedBudget = await client.budget.delete({
            where: { id: id }
        });

        res.status(200).json({ message: "Budget deleted successfully", data: deletedBudget });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
});



app.listen(5000, () => {
    console.log(`App is running on port 5000`)
})

