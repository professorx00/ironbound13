import IronboundActorBase from './base-actor.mjs';

export default class IronboundNPC extends IronboundActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'IRONBOUND.Actor.NPC',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.power = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
      }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 }),
    });

    schema.weakness = new fields.StringField({initial: "" })
    schema.resistance = new fields.StringField({initial: "" })
    schema.dmgRed = new fields.NumberField({ ...requiredInteger, initial: 4 })

    return schema;
  }

  prepareDerivedData() {
    
  }
}
