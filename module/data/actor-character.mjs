import IronboundActorBase from './base-actor.mjs';

export default class IronboundCharacter extends IronboundActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'IRONBOUND.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    

    schema.arcane = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      temp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      def: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    schema.mental = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      temp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      def: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    schema.physical = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      temp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      def: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    schema.corruption = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 0 })
    schema.marks = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 0 })

    schema.money = new fields.SchemaField({
      credits: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
      }),
      copper: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
      }),
      silver: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
      }),
      gold: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
      })
    });

    return schema;
  }

  prepareDerivedData() {
    
  }

  getRollData() {
    const data = {};

    data.lvl = this.level.value;

    return data;
  }
}
