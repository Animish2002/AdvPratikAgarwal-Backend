// controllers/noticeController.js
/**
 * This file contains functions for interacting with the notices table in the database.
 * The functions are used by the routes to create, read, update and delete notices.
 */

const supabase = require('../config/supabaseClient');

/**
 * The noticeController object contains functions for interacting with the notices table in the database.
 */
const noticeController = {
  /**
   * Creates a new notice in the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createNotice(req, res) {
    try {
      // Get the title and content from the request body.
      const { title, content } = req.body;
      
      // Insert the notice into the database and return the inserted notice.
      const { data, error } = await supabase
        .from('notices')
        .insert({ title, content })
        .select();

      // If there is an error, throw it.
      if (error) throw error;

      // Return a success response with the inserted notice.
      res.status(201).json({
        message: 'Notice created successfully',
        notice: data[0]
      });
    } catch (error) {
      // Return an error response with the error message.
      res.status(500).json({ 
        message: 'Error creating notice', 
        error: error.message 
      });
    }
  },

  /**
   * Retrieves all notices from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllNotices(req, res) {
    try {
      // Retrieve all notices from the database.
      const { data, error } = await supabase
        .from('notices')
        .select('*');

      // If there is an error, throw it.
      if (error) throw error;

      // Return a success response with the notices.
      res.status(200).json(data);
    } catch (error) {
      // Return an error response with the error message.
      res.status(500).json({ 
        message: 'Error fetching notices', 
        error: error.message 
      });
    }
  },

  /**
   * Retrieves a single notice from the database by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getNoticeById(req, res) {
    try {
      // Get the ID from the request parameters.
      const { id } = req.params;
      
      // Retrieve the notice from the database by ID.
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single();

      // If there is an error, throw it.
      if (error) throw error;

      // Return a success response with the notice.
      res.status(200).json(data);
    } catch (error) {
      // Return an error response with the error message.
      res.status(404).json({ 
        message: 'Notice not found', 
        error: error.message 
      });
    }
  },

  /**
   * Updates a single notice in the database by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateNotice(req, res) {
    try {
      // Get the ID from the request parameters.
      const { id } = req.params;
      
      // Get the title and content from the request body.
      const { title, content } = req.body;
      
      // Update the notice in the database and return the updated notice.
      const { data, error } = await supabase
        .from('notices')
        .update({ title, content })
        .eq('id', id)
        .select();

      // If there is an error, throw it.
      if (error) throw error;

      // Return a success response with the updated notice.
      res.status(200).json({
        message: 'Notice updated successfully',
        notice: data[0]
      });
    } catch (error) {
      // Return an error response with the error message.
      res.status(500).json({ 
        message: 'Error updating notice', 
        error: error.message 
      });
    }
  },

  /**
   * Deletes a single notice from the database by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteNotice(req, res) {
    try {
      // Get the ID from the request parameters.
      const { id } = req.params;
      
      // Delete the notice from the database.
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      // If there is an error, throw it.
      if (error) throw error;

      // Return a success response.
      res.status(200).json({ 
        message: 'Notice deleted successfully' 
      });
    } catch (error) {
      // Return an error response with the error message.
      res.status(500).json({ 
        message: 'Error deleting notice', 
        error: error.message 
      });
    }
  }
};

// Export the noticeController object.
module.exports = noticeController;
