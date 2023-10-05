// add occupations
// get occupations
// update occupation
// delete occuaption

const logger = require('../../utils/logger')
const {Occupations} = require('../../models')

const addOccupations = async (req, res) => {
    logger.info('INFO -> ADDING OCCUPATIONS API CALLED');
    try {
        const { name, description, parentId } = req.body;

        // Create a new occupation
        const newOccupation = await Occupations.create({
            name,
            description,
            parentId, // If parentId is provided, it will create a nested occupation
        });

        res.status(201).json({ message: 'Occupation added successfully', data: newOccupation });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}

const getOccupations = async (req, res) => {
    logger.info('INFO -> GETTING OCCUPATIONS API CALLED');
    try {
        const { page = 1, perPage = 10 } = req.query;

        // Calculate the offset based on the page and perPage values
        const offset = (page - 1) * perPage;

        // Retrieve all occupations, including nested ones, with pagination
        const occupations = await Occupations.findAndCountAll({
            include: [
                { model: Occupations, as: 'children' }, // Include nested occupations
                { model: User }, // Include associated user data if needed
            ],
            limit: perPage,
            offset,
        });

        res.status(200).json({
            message: 'Occupations retrieved successfully',
            data: occupations.rows, // List of occupations
            total: occupations.count, // Total count of occupations
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}



const updateOccupation = async (req, res) => {
    logger.info('INFO -> UPDATING OCCUPATION API CALLED');
    try {
        const { id } = req.params; // Assuming you have an 'id' parameter in the route
        const { name, description, parentId } = req.body;

        // Find the occupation by ID
        const existingOccupation = await Occupations.findByPk(id);

        if (!existingOccupation) {
            return res.status(404).json({ message: 'Occupation not found' });
        }

        // Update the occupation properties
        existingOccupation.name = name;
        existingOccupation.description = description;
        existingOccupation.parentId = parentId;

        // Save the updated occupation to the database
        await existingOccupation.save();

        res.status(200).json({ message: 'Occupation updated successfully', data: existingOccupation });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}


const deleteOccupation = async (req, res) => {
    logger.info('INFO -> DELETING OCCUPATION API CALLED');
    try {
        const { id } = req.params; // Assuming you have an 'id' parameter in the route

        // Find the occupation by ID
        const existingOccupation = await Occupations.findByPk(id);

        if (!existingOccupation) {
            return res.status(404).json({ message: 'Occupation not found' });
        }

        // Delete the occupation from the database
        await existingOccupation.destroy();

        res.status(200).json({ message: 'Occupation deleted successfully' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
}


module.exports = {
    addOccupations,
    getOccupations,
    updateOccupation,
    deleteOccupation
}