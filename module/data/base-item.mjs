export default class IronboundItemBase extends foundry.abstract.TypeDataModel {
  static LOCALIZATION_PREFIXES = ["IRONBOUND.Item.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.pools = new fields.SchemaField({
      value: new fields.StringField({ initial: "none" }),
      list: new fields.SchemaField({
        none: new fields.StringField({ initial: "none" }),
        arcane: new fields.StringField({ initial: "arcane" }),
        mental: new fields.StringField({ initial: "mental" }),
        physical: new fields.StringField({ initial: "physical" }),
        any: new fields.StringField({ initial: "any" }),
      }),
    });

    schema.damageTypes = new fields.SchemaField({
      list: new fields.SchemaField({
        none: new fields.StringField({ initial: "None" }),
        slashing: new fields.StringField({ initial: "slashing" }),
        piercing: new fields.StringField({ initial: "piercing" }),
        bludgeoning: new fields.StringField({ initial: "bludgeoning" }),
        arcane: new fields.StringField({ initial: "arcane" }),
        mental: new fields.StringField({ initial: "mental" }),
      }),
    });

    schema.description = new fields.HTMLField();

    schema.quantity = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });

    schema.weight = new fields.NumberField({
      initial: 0,
    });

    return schema;
  }
}
