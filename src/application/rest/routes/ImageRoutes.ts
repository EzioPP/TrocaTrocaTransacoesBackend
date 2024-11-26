import { ImageControllerFactory } from '@/application/factories';
import { User } from '@/domain/entities';
import { Router, Request, Response } from 'express';
import { Image } from '@/domain/entities/Image';
import multer from 'multer';
import protect from '../middleware/Protect';
import { can } from '../middleware/Permission';
import path from 'path';
import { SharpImageServices } from '@/infra/services/SharpImageServices';
const fs = require('fs').promises;
const ImageRoutes = Router();
const imageController = ImageControllerFactory();
const upload = multer({ dest: 'uploads/' });
ImageRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const images = await imageController.findAll();
        res.send(images);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

ImageRoutes.get('/:id', async (req: Request, res: Response) => {
    try {
        const image = await imageController.findByImageId(Number(req.params.id));
        if (!image) {
            res.status(404).send({ error: 'Image not found' });
        }
        res.send(image);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

ImageRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const imageReceived = req.body;
        const image = await imageController.save(imageReceived);
        res.status(200).send(image);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

ImageRoutes.post('/client/profile',
    upload.single('image'),
    protect,
    can('user'),
    async (req: Request, res: Response) => {
        try {
            const user: User = req.user as User;
            const imageData = req.file;
            if (!imageData) {
                return res.status(400).send({ error: 'Image not found' });
            }
            const imageServices = new SharpImageServices();
            const buffer = await imageServices.convertImageToBuffer(imageData.path);
            const resizedBuffer = await imageServices.changeResolution(buffer, 400, 400);

            const title = `profile-${user.clientId}`;
            const image = new Image(title, resizedBuffer, user.clientId);
            const oldImage = await imageController.findByTitle(title);
            if (oldImage) {
                await imageController.delete(oldImage.imageId);
            }
            const imageResult = await imageController.save(image);;

            res.status(200).send(imageResult);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
);
ImageRoutes.get('/client/profile',
    protect,
    async (req: Request, res: Response) => {
        try {

            const user: User = req.user as User;
            const title = `profile-${user.clientId}`;
            let image;
            image = await imageController.findByTitle(title);
            if (!image) {
                image = await imageController.findByTitle('profile-default');
            }
            res.setHeader('Content-Type', 'image/jpg');
            res.send(image?.image);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
ImageRoutes.put('/:id', async (req: Request, res: Response) => {
    try {
        const imageReceived = req.body;
        const image = await imageController.update(imageReceived);
        res.status(200).send(image);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

ImageRoutes.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleteResult = await imageController.delete(Number(req.params.id));
        res.send("Image deleted");
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default ImageRoutes;