// images that are uploaded in batches to cloudinary will be stored on db to track them and fetch later
const supabase = require("../controllers/db");

// fetch gallery images
exports.getGallery = async (req, res) => {
  // implement pagination with limit and offset
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .range(offset, offset + limit - 1);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
};

// add multiple image at once to gallery info to db as a list
exports.addImage = async (req, res) => {
  const { imageUrl, publicId } = req.body;
    const { data, error } = await supabase
        .from("gallery")
        .insert([{ image_url: imageUrl, public_id: publicId }]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
};

// delete image from gallery by id
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
    const { data, error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
};
