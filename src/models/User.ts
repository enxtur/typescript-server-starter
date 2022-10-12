import mongoose, { Document, Model, Schema } from "mongoose";

interface UserProps {
  email: string;
  password: string;
  name: string;
}

export interface UserDocument extends UserProps, Document {
  createdAt: Date;
  updatedAt: Date;
  updatePassword: (password: string) => Promise<void>;
  validatePassword: (password: string) => boolean;
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
  findByEmail: (email: string) => Promise<UserDocument | null>;
}

const UserSchema = new Schema<UserDocument, UserModel>({
  email: {
    type    : String,
    required: true,
  },
  password: {
    type    : String,
    required: true,
  },
  name: {
    type    : String,
    required: true,
  },
});

UserSchema.statics.build = (props: UserProps) => {
  return new User({
    ...props,
    password: `some encrypts...${props.password}`,
  });
};

UserSchema.statics.findByEmail = (email: string) => User.findOne({ email });

UserSchema.methods.updatePassword = async function (password: string) {
  this.password = `some encrypts...${password}`;
  await this.save();
};

UserSchema.methods.validatePassword = async function (password: string) {
  await this.password === `some encrypts...${password}`;
};

export const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);


