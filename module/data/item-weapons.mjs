import IronboundItemBase from './base-item.mjs';

export default class IronboundWeapon extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.Weapons",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.ap = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });

    schema.hasBoon = new fields.BooleanField({ initial: false });

    schema.equipped = new fields.BooleanField({ initial: false });

    schema.poolCost = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolCostType = new fields.StringField({ initial: "none" });

    schema.poolBonus = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolBonusType = new fields.StringField({ initial: "none" });

    schema.healingFormula = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.healingType = new fields.StringField({ initial: "none" });

    schema.damageFormula = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.damageType = new fields.StringField({ initial: "none" });

    schema.weaponGrade = new fields.SchemaField({
      value: new fields.StringField({ initial: "light" }),
      list: new fields.SchemaField({
        light: new fields.StringField({ initial: "light" }),
        medium: new fields.StringField({ initial: "medium" }),
        heavy: new fields.StringField({ initial: "heavy" }),
      }),
    });

    schema.weaponType = new fields.SchemaField({
      value: new fields.StringField({ initial: "slashing" }),
      list: new fields.SchemaField({
        slashing: new fields.StringField({ initial: "light" }),
        piercing: new fields.StringField({ initial: "medium" }),
        bludgeoning: new fields.StringField({ initial: "heavy" }),
        single: new fields.StringField({ initial: "single" }),
        auto: new fields.StringField({ initial: "auto" }),
      }),
    });

    schema.ammo = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });

    return schema;
  }
}
