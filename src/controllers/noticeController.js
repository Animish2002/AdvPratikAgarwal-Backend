// controllers/noticeController.js
const supabase = require('../config/supabaseClient');

const noticeController = {
  // Create a new notice
  async createNotice(req, res) {
    try {
      const { title, content } = req.body;
      
      const { data, error } = await supabase
        .from('notices')
        .insert({ title, content })
        .select();

      if (error) throw error;

      res.status(201).json({
        message: 'Notice created successfully',
        notice: data[0]
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error creating notice', 
        error: error.message 
      });
    }
  },

  // Get all notices
  async getAllNotices(req, res) {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*');

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching notices', 
        error: error.message 
      });
    }
  },

  // Get a single notice by ID
  async getNoticeById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ 
        message: 'Notice not found', 
        error: error.message 
      });
    }
  },

  // Update a notice
  async updateNotice(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      
      const { data, error } = await supabase
        .from('notices')
        .update({ title, content })
        .eq('id', id)
        .select();

      if (error) throw error;

      res.status(200).json({
        message: 'Notice updated successfully',
        notice: data[0]
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error updating notice', 
        error: error.message 
      });
    }
  },

  // Delete a notice
  async deleteNotice(req, res) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.status(200).json({ 
        message: 'Notice deleted successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting notice', 
        error: error.message 
      });
    }
  }
};

module.exports = noticeController;