const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customIngredient = new Schema({
    title: {
        en: {
            type: String,
            maxlength: 255,
            required: true
        },
        he: {
            type: String,
            maxlength: 255,
            required: true
        },
        ru: {
            type: String,
            maxlength: 255,
            required: true
        },
    },
    required: Boolean
});
customIngredient.set('toObject', { virtuals: true });
customIngredient.set('toJSON', { virtuals: true });

const Image = new Schema({
    filename: String,
    alt: String,
    ext: String,
    width: Number,
    height: Number,
    position: {
        type: Number,
        default: 1
    }
});
Image.set('toObject', { virtuals: true });
Image.set('toJSON', { virtuals: true });

Image.virtual('src').get(function() {
    return `${process.env.UPLOAD_URL}/products/${this.parent().id}/${this.filename}.${this.ext}`;
});
Image.virtual('srcWebp').get(function() {
    return `${process.env.UPLOAD_URL}/products/${this.parent().id}/${this.filename}.webp`;
});

const ProductSchema = new Schema({
    title: {
        en: {
            type: String,
            maxlength: 255,
            required: true
        },
        he: {
            type: String,
            maxlength: 255,
            required: true
        },
        ru: {
            type: String,
            maxlength: 255,
            required: true
        },
    },
    subTitle: {
        en: {
            type: String,
            maxlength: 255,
            required: true
        },
        he: {
            type: String,
            maxlength: 255,
            required: true
        },
        ru: {
            type: String,
            maxlength: 255,
            required: true
        },
    },
    sort: Number,
    handle: {
        type: String,
        maxlength: 510
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'archived', 'draft'],
        default: 'draft'
    },
    images: [Image],
    ageRestricted: {
        type: Boolean,
        default: false
    },
    ingredientIds: [],
    customIngredients: [customIngredient],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    availableForSale: {
    type: Boolean,
    default: true
    }
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);