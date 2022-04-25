import {ImageMatrix as ImageMatrixComponent} from "@miniskylab/antimatter-image-matrix";
import {ImageMatrixDeserializerCreator} from "./deserializer-creator";

export const ImageMatrix = new ImageMatrixDeserializerCreator().createFrom(ImageMatrixComponent);
export {Props} from "./model";
