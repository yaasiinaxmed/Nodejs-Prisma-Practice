import express from 'express'
import pirsma from './lib/index.js'

const router = express.Router()

router.get('/', async (req, res) => {
   try {
     
    const students = await pirsma.students.findMany();

    if(students.length === 0) {
        return res.status(404).json({status: 404, message: "Students not found"})
    }

    res.json(students)

   } catch (error) {
     res.status(500).json({status: 500, message: error.message})
   }
})

router.get("/:id", async (req, res) => {
    try {
        
        const {id} = req.params;

        const student = await pirsma.students.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!student) {
            return res.status(404).json({status: 404, message: "Student not found"})
        }

        res.json(student)
    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
})

router.post('/add_student', async (req, res) => {
    try {
        
        const {name, classSchool, school} = req.body

        const newStudent = await pirsma.students.create({
            data: {
                name,
                classSchool,
                school,
            }
        });

        if(!newStudent) {
            return res.status(400).json({status: 400, message: "Student was not created!"})
        }

        res.status(200).json({status: 200, message: "Student created successFully"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
})

router.put("/update_student/:id", async (req, res) => {
    try {
        
        const {id} = req.params
        const {name, classSchool, school} = req.body

        const updateStudent = await pirsma.students.update({
            where: {
                id: Number(id),
            },
            
            data: {
                name,
                classSchool,
                school,
            },
        });

        if(!updateStudent) {
            return res.status(400).json({status: 400, message: "student was not updated!"})
        }

        res.status(200).json({status: 200, message: "Student update sucessFully"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
})

router.delete("/delete_student/:id", async (req, res) => {
    try {
        
        const {id} = req.params;
        const deleteStudent = await pirsma.students.delete({
            where: {
                id: Number(id)
            }
        });

        if(!deleteStudent) {
            return res.status(400).json({status: 400, message: "student was not deleted!"})
        }

        res.status(200).json({status: 200, message: `student ${id} deleted successFully`})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
})

export default router