export const findAll = async(model, context) => {
  return await model.find({}).exec();
}