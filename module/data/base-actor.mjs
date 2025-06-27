export default class IronboundActorBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ["IRONBOUND.Actor.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.level = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
    });

    schema.health = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
      }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 }),
    });

    schema.ap = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 3,
        min: 0,
      }),
      max: new fields.NumberField({ ...requiredInteger, initial: 3 }),
    });
    
    schema.movement = new fields.NumberField({
      ...requiredInteger,
      initial: 20,
      min: 0,
    });

    schema.tn = new fields.NumberField({
      ...requiredInteger,
      initial: 9,
      min: 1,
      max: 12
    });

    schema.bonus = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
    });

    schema.powerDie = new fields.SchemaField({
      value: new fields.StringField({ initial: "1d6" }),
      list: new fields.SchemaField({
        "1d4": new fields.StringField({ initial: "1D4" }),
        "1d6": new fields.StringField({ initial: "1D6" }),
        "1d63": new fields.StringField({ initial: "1D6+3" }),
        "1d8": new fields.StringField({ initial: "1D8" }),
        "1d10": new fields.StringField({ initial: "1D10" }),
        "1d12": new fields.StringField({ initial: "1D12" }),
        "1d123": new fields.StringField({ initial: "1D12+3" }),
        "1d126": new fields.StringField({ initial: "1D12+6" }),
      }),
    });

    schema.pools = new fields.SchemaField({
      value: new fields.StringField({ initial: "none" }),
      list: new fields.SchemaField({
        "none": new fields.StringField({ initial: "None" }),
        "arcane": new fields.StringField({ initial: "Arcane" }),
        "mental": new fields.StringField({ initial: "Mental" }),
        "physical": new fields.StringField({ initial: "Physical" }),
      }),
    });

    schema.plague = new fields.BooleanField({initial: false})
    schema.biography = new fields.HTMLField();

    return schema;
  }
}
