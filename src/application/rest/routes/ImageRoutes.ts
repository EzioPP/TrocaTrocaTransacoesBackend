import { ImageControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';

const ImageRoutes = Router();
const imageController = ImageControllerFactory();

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
        const image = await imageController.delete(Number(req.params.id));
        if (!image) {
            res.status(404).send({ error: 'Image not found' });
        }
        res.send(image);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default ImageRoutes;